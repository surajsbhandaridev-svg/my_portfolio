import { Request, Response, NextFunction } from 'express';
import { isDbConnected, inMemoryStore } from '../services/dataService';
import { Message } from '../models/Message';

export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ success: false, message: 'All fields (name, email, subject, message) are required.' });
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
      return;
    }

    if (message.trim().length < 10) {
      res.status(400).json({ success: false, message: 'Message must be at least 10 characters long.' });
      return;
    }

    if (isDbConnected()) {
      const saved = await Message.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        isRead: false,
      });
      res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been recorded into the engineering journal. Suraj will get back to you shortly.',
        data: { id: saved._id, createdAt: saved.createdAt },
      });
    } else {
      const saved = {
        _id: 'msg_' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryStore.messages.unshift(saved);
      res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been recorded into the engineering journal. Suraj will get back to you shortly.',
        data: { id: saved._id, createdAt: saved.createdAt },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    if (isDbConnected()) {
      const total = await Message.countDocuments();
      const messages = await Message.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
      res.json({
        success: true,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: messages,
      });
    } else {
      const total = inMemoryStore.messages.length;
      const messages = inMemoryStore.messages.slice(skip, skip + limit);
      res.json({
        success: true,
        total,
        page,
        pages: Math.ceil(total / limit) || 1,
        data: messages,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const markMessageRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    const readState = isRead !== undefined ? Boolean(isRead) : true;

    if (isDbConnected()) {
      const updated = await Message.findByIdAndUpdate(id, { isRead: readState }, { new: true });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Message not found.' });
        return;
      }
      res.json({ success: true, message: 'Message updated.', data: updated });
    } else {
      const msg = inMemoryStore.messages.find((m) => m._id === id);
      if (!msg) {
        res.status(404).json({ success: false, message: 'Message not found.' });
        return;
      }
      msg.isRead = readState;
      res.json({ success: true, message: 'Message updated.', data: msg });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await Message.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Message not found.' });
        return;
      }
      res.json({ success: true, message: 'Message deleted successfully.' });
    } else {
      const index = inMemoryStore.messages.findIndex((m) => m._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Message not found.' });
        return;
      }
      inMemoryStore.messages.splice(index, 1);
      res.json({ success: true, message: 'Message deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
