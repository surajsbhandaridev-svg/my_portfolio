import { Request, Response, NextFunction } from 'express';
import { isDbConnected, inMemoryStore } from '../services/dataService';
import { SiteSettings } from '../models/SiteSettings';

export const getSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isDbConnected()) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create(inMemoryStore.siteSettings);
      }
      res.json({ success: true, data: settings });
    } else {
      res.json({ success: true, data: inMemoryStore.siteSettings });
    }
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updateData = { ...req.body };
    if (updateData.quickFacts && typeof updateData.quickFacts === 'string') {
      updateData.quickFacts = updateData.quickFacts.split('\n').filter(Boolean);
    }

    if (isDbConnected()) {
      let settings = await SiteSettings.findOne();
      if (settings) {
        Object.assign(settings, updateData);
        await settings.save();
      } else {
        settings = await SiteSettings.create(updateData);
      }
      res.json({ success: true, message: 'Settings updated successfully.', data: settings });
    } else {
      inMemoryStore.siteSettings = {
        ...inMemoryStore.siteSettings,
        ...updateData,
        updatedAt: new Date(),
      };
      res.json({ success: true, message: 'Settings updated successfully.', data: inMemoryStore.siteSettings });
    }
  } catch (error) {
    next(error);
  }
};
