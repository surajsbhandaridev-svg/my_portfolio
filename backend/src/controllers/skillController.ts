import { Request, Response, NextFunction } from 'express';
import { isDbConnected, inMemoryStore } from '../services/dataService';
import { Skill } from '../models/Skill';

export const getSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, grouped } = req.query;

    let skillsList: any[] = [];
    if (isDbConnected()) {
      const filter: any = {};
      if (category) filter.category = category;
      skillsList = await Skill.find(filter).sort({ sortOrder: 1, createdAt: 1 });
    } else {
      skillsList = [...inMemoryStore.skills];
      if (category) {
        skillsList = skillsList.filter((s) => s.category === category);
      }
      skillsList.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }

    if (grouped === 'true') {
      const categories = ['languages', 'frontend', 'backend', 'databases', 'tools', 'core_cs'];
      const groupedData: Record<string, any[]> = {};
      categories.forEach((cat) => {
        groupedData[cat] = skillsList.filter((s) => s.category === cat);
      });
      res.json({ success: true, count: skillsList.length, data: groupedData });
      return;
    }

    res.json({ success: true, count: skillsList.length, data: skillsList });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, category, status, icon, sortOrder } = req.body;

    if (!name || !category) {
      res.status(400).json({ success: false, message: 'Name and category are required.' });
      return;
    }

    if (isDbConnected()) {
      const newSkill = await Skill.create({
        name,
        category,
        status: status || 'proficient',
        icon: icon || '',
        sortOrder: Number(sortOrder) || 0,
      });
      res.status(201).json({ success: true, message: 'Skill added successfully.', data: newSkill });
    } else {
      const newSkill = {
        _id: 'sk_' + Date.now(),
        name,
        category,
        status: status || 'proficient',
        icon: icon || '',
        sortOrder: Number(sortOrder) || inMemoryStore.skills.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryStore.skills.push(newSkill);
      res.status(201).json({ success: true, message: 'Skill added successfully.', data: newSkill });
    }
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const updated = await Skill.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Skill not found.' });
        return;
      }
      res.json({ success: true, message: 'Skill updated successfully.', data: updated });
    } else {
      const index = inMemoryStore.skills.findIndex((s) => s._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Skill not found.' });
        return;
      }
      inMemoryStore.skills[index] = {
        ...inMemoryStore.skills[index],
        ...req.body,
        updatedAt: new Date(),
      };
      res.json({ success: true, message: 'Skill updated successfully.', data: inMemoryStore.skills[index] });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await Skill.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Skill not found.' });
        return;
      }
      res.json({ success: true, message: 'Skill deleted successfully.' });
    } else {
      const index = inMemoryStore.skills.findIndex((s) => s._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Skill not found.' });
        return;
      }
      inMemoryStore.skills.splice(index, 1);
      res.json({ success: true, message: 'Skill deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
