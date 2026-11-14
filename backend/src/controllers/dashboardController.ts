import { Request, Response, NextFunction } from 'express';
import { isDbConnected, inMemoryStore } from '../services/dataService';
import { Project } from '../models/Project';
import { Skill } from '../models/Skill';
import { Message } from '../models/Message';
import { Education } from '../models/Education';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isDbConnected()) {
      const [totalProjects, publishedProjects, draftProjects, totalSkills, unreadMessages, totalEducation, recentMessages] =
        await Promise.all([
          Project.countDocuments(),
          Project.countDocuments({ status: { $in: ['completed', 'ongoing'] } }),
          Project.countDocuments({ status: 'experimental' }),
          Skill.countDocuments(),
          Message.countDocuments({ isRead: false }),
          Education.countDocuments(),
          Message.find().sort({ createdAt: -1 }).limit(5),
        ]);

      res.json({
        success: true,
        stats: {
          totalProjects,
          publishedProjects,
          draftProjects,
          totalSkills,
          unreadMessages,
          totalEducation,
        },
        recentMessages,
      });
    } else {
      const totalProjects = inMemoryStore.projects.length;
      const publishedProjects = inMemoryStore.projects.filter((p) => p.status !== 'experimental').length;
      const draftProjects = inMemoryStore.projects.filter((p) => p.status === 'experimental').length;
      const totalSkills = inMemoryStore.skills.length;
      const unreadMessages = inMemoryStore.messages.filter((m) => !m.isRead).length;
      const totalEducation = inMemoryStore.education.length;
      const recentMessages = inMemoryStore.messages.slice(0, 5);

      res.json({
        success: true,
        stats: {
          totalProjects,
          publishedProjects,
          draftProjects,
          totalSkills,
          unreadMessages,
          totalEducation,
        },
        recentMessages,
      });
    }
  } catch (error) {
    next(error);
  }
};
