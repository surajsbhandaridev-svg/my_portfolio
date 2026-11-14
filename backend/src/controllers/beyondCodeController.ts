import { Request, Response, NextFunction } from 'express';
import { isDbConnected, inMemoryStore } from '../services/dataService';
import { BeyondCode } from '../models/BeyondCode';

export const getBeyondCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isDbConnected()) {
      const items = await BeyondCode.find().sort({ sortOrder: 1, createdAt: 1 });
      res.json({ success: true, count: items.length, data: items });
    } else {
      const items = [...inMemoryStore.beyondCode].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      res.json({ success: true, count: items.length, data: items });
    }
  } catch (error) {
    next(error);
  }
};

export const createBeyondCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, category, description, annotation, image, tags, sortOrder } = req.body;

    if (!title || !description) {
      res.status(400).json({ success: false, message: 'Title and description are required.' });
      return;
    }

    const tagList = Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : [];

    if (isDbConnected()) {
      const item = await BeyondCode.create({
        title,
        category: category || 'Interests',
        description,
        annotation: annotation || '',
        image: image || '',
        tags: tagList,
        sortOrder: Number(sortOrder) || inMemoryStore.beyondCode.length + 1,
      });
      res.status(201).json({ success: true, message: 'Item created.', data: item });
    } else {
      const item = {
        _id: 'bc_' + Date.now(),
        title,
        category: category || 'Interests',
        description,
        annotation: annotation || '',
        image: image || '',
        tags: tagList,
        sortOrder: Number(sortOrder) || inMemoryStore.beyondCode.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryStore.beyondCode.push(item);
      res.status(201).json({ success: true, message: 'Item created.', data: item });
    }
  } catch (error) {
    next(error);
  }
};

export const updateBeyondCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map((t: string) => t.trim());
    }

    if (isDbConnected()) {
      const updated = await BeyondCode.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Item not found.' });
        return;
      }
      res.json({ success: true, message: 'Item updated.', data: updated });
    } else {
      const index = inMemoryStore.beyondCode.findIndex((b) => b._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Item not found.' });
        return;
      }
      inMemoryStore.beyondCode[index] = {
        ...inMemoryStore.beyondCode[index],
        ...updateData,
        updatedAt: new Date(),
      };
      res.json({ success: true, message: 'Item updated.', data: inMemoryStore.beyondCode[index] });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteBeyondCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await BeyondCode.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Item not found.' });
        return;
      }
      res.json({ success: true, message: 'Item deleted.' });
    } else {
      const index = inMemoryStore.beyondCode.findIndex((b) => b._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Item not found.' });
        return;
      }
      inMemoryStore.beyondCode.splice(index, 1);
      res.json({ success: true, message: 'Item deleted.' });
    }
  } catch (error) {
    next(error);
  }
};
