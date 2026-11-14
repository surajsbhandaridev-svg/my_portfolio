import { Request, Response, NextFunction } from 'express';
import { isDbConnected, inMemoryStore } from '../services/dataService';
import { JourneyContent } from '../models/JourneyContent';

export const getJourney = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isDbConnected()) {
      let journey = await JourneyContent.findOne();
      if (!journey) {
        journey = await JourneyContent.create(inMemoryStore.journeyContent);
      }
      res.json({ success: true, data: journey });
    } else {
      res.json({ success: true, data: inMemoryStore.journeyContent });
    }
  } catch (error) {
    next(error);
  }
};

export const updateJourney = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isDbConnected()) {
      let journey = await JourneyContent.findOne();
      if (journey) {
        Object.assign(journey, req.body);
        await journey.save();
      } else {
        journey = await JourneyContent.create(req.body);
      }
      res.json({ success: true, message: 'Journey content updated.', data: journey });
    } else {
      inMemoryStore.journeyContent = {
        ...inMemoryStore.journeyContent,
        ...req.body,
        updatedAt: new Date(),
      };
      inMemoryStore.saveToFile();
      res.json({ success: true, message: 'Journey content updated.', data: inMemoryStore.journeyContent });
    }
  } catch (error) {
    next(error);
  }
};
