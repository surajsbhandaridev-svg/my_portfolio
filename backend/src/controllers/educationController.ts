import { Request, Response, NextFunction } from 'express';
import { isDbConnected, inMemoryStore } from '../services/dataService';
import { Education } from '../models/Education';

export const getEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isDbConnected()) {
      const records = await Education.find().sort({ sortOrder: 1, createdAt: 1 });
      res.json({ success: true, count: records.length, data: records });
    } else {
      const records = [...inMemoryStore.education].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      res.json({ success: true, count: records.length, data: records });
    }
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { institution, degree, field, startDate, endDate, current, description, milestones, sortOrder } = req.body;

    if (!institution || !degree) {
      res.status(400).json({ success: false, message: 'Institution and degree are required.' });
      return;
    }

    const milestonesList = Array.isArray(milestones) ? milestones : typeof milestones === 'string' ? milestones.split('\n').filter(Boolean) : [];

    if (isDbConnected()) {
      const record = await Education.create({
        institution,
        degree,
        field: field || '',
        startDate: startDate || '',
        endDate: endDate || '',
        current: Boolean(current),
        description: description || '',
        milestones: milestonesList,
        sortOrder: Number(sortOrder) || inMemoryStore.education.length + 1,
      });
      res.status(201).json({ success: true, message: 'Education record added.', data: record });
    } else {
      const record = {
        _id: 'edu_' + Date.now(),
        institution,
        degree,
        field: field || '',
        startDate: startDate || '',
        endDate: endDate || '',
        current: Boolean(current),
        description: description || '',
        milestones: milestonesList,
        sortOrder: Number(sortOrder) || inMemoryStore.education.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryStore.education.push(record);
      res.status(201).json({ success: true, message: 'Education record added.', data: record });
    }
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.milestones && typeof updateData.milestones === 'string') {
      updateData.milestones = updateData.milestones.split('\n').filter(Boolean);
    }

    if (isDbConnected()) {
      const updated = await Education.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Record not found.' });
        return;
      }
      res.json({ success: true, message: 'Education record updated.', data: updated });
    } else {
      const index = inMemoryStore.education.findIndex((e) => e._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Record not found.' });
        return;
      }
      inMemoryStore.education[index] = {
        ...inMemoryStore.education[index],
        ...updateData,
        updatedAt: new Date(),
      };
      res.json({ success: true, message: 'Education record updated.', data: inMemoryStore.education[index] });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await Education.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Record not found.' });
        return;
      }
      res.json({ success: true, message: 'Education record deleted.' });
    } else {
      const index = inMemoryStore.education.findIndex((e) => e._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Record not found.' });
        return;
      }
      inMemoryStore.education.splice(index, 1);
      res.json({ success: true, message: 'Education record deleted.' });
    }
  } catch (error) {
    next(error);
  }
};
