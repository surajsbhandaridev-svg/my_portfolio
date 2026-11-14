import { Request, Response, NextFunction } from 'express';
import { isDbConnected, inMemoryStore } from '../services/dataService';
import { Project } from '../models/Project';

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, status, featured } = req.query;

    if (isDbConnected()) {
      const filter: any = {};
      if (category && category !== 'all') filter.category = String(category);
      if (status) filter.status = String(status);
      if (featured !== undefined) filter.featured = featured === 'true';

      const projects = await Project.find(filter).sort({ sortOrder: 1, createdAt: -1 });
      res.json({ success: true, count: projects.length, data: projects });
    } else {
      let results = [...inMemoryStore.projects];
      if (category && category !== 'all') {
        const catStr = String(category).toLowerCase();
        results = results.filter((p) => p.category.toLowerCase() === catStr);
      }
      if (status) {
        results = results.filter((p) => p.status === status);
      }
      if (featured !== undefined) {
        results = results.filter((p) => p.featured === (featured === 'true'));
      }
      results.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      res.json({ success: true, count: results.length, data: results });
    }
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slugStr = String(req.params.slug).toLowerCase();

    if (isDbConnected()) {
      const project = await Project.findOne({ slug: slugStr });
      if (!project) {
        res.status(404).json({ success: false, message: 'Project not found.' });
        return;
      }
      res.json({ success: true, data: project });
    } else {
      const project = inMemoryStore.projects.find((p) => p.slug.toLowerCase() === slugStr);
      if (!project) {
        res.status(404).json({ success: false, message: 'Project not found.' });
        return;
      }
      res.json({ success: true, data: project });
    }
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, slug, description, longDescription, technologies, category, status, image, githubUrl, liveUrl, featured, sortOrder } = req.body;

    if (!title || !description) {
      res.status(400).json({ success: false, message: 'Title and description are required.' });
      return;
    }

    const projectSlug = (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).toLowerCase();
    const techArray = Array.isArray(technologies) ? technologies : typeof technologies === 'string' ? technologies.split(',').map((t: string) => t.trim()) : [];

    if (isDbConnected()) {
      const newProject = await Project.create({
        title,
        slug: projectSlug,
        description,
        longDescription: longDescription || '',
        technologies: techArray,
        category: category || 'fullstack',
        status: status || 'completed',
        image: image || '',
        githubUrl: githubUrl || '',
        liveUrl: liveUrl || '',
        featured: Boolean(featured),
        sortOrder: Number(sortOrder) || inMemoryStore.projects.length + 1,
      });
      res.status(201).json({ success: true, message: 'Project created successfully.', data: newProject });
    } else {
      const newProject = {
        _id: 'proj_' + Date.now(),
        title,
        slug: projectSlug,
        description,
        longDescription: longDescription || '',
        technologies: techArray,
        category: category || 'fullstack',
        status: status || 'completed',
        image: image || '',
        githubUrl: githubUrl || '',
        liveUrl: liveUrl || '',
        featured: Boolean(featured),
        sortOrder: Number(sortOrder) || inMemoryStore.projects.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryStore.projects.push(newProject);
      inMemoryStore.saveToFile();
      res.status(201).json({ success: true, message: 'Project created successfully.', data: newProject });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.technologies && typeof updateData.technologies === 'string') {
      updateData.technologies = updateData.technologies.split(',').map((t: string) => t.trim());
    }

    if (isDbConnected()) {
      const updated = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Project not found.' });
        return;
      }
      res.json({ success: true, message: 'Project updated successfully.', data: updated });
    } else {
      const index = inMemoryStore.projects.findIndex((p) => p._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Project not found.' });
        return;
      }
      inMemoryStore.projects[index] = {
        ...inMemoryStore.projects[index],
        ...updateData,
        updatedAt: new Date(),
      };
      inMemoryStore.saveToFile();
      res.json({ success: true, message: 'Project updated successfully.', data: inMemoryStore.projects[index] });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Project not found.' });
        return;
      }
      res.json({ success: true, message: 'Project deleted successfully.' });
    } else {
      const index = inMemoryStore.projects.findIndex((p) => p._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Project not found.' });
        return;
      }
      inMemoryStore.projects.splice(index, 1);
      inMemoryStore.saveToFile();
      res.json({ success: true, message: 'Project deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
