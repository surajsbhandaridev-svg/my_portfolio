import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isDbConnected, inMemoryStore } from '../services/dataService';
import { Admin } from '../models/Admin';
import { AuthRequest } from '../middleware/auth';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    let adminRecord: any = null;

    if (isDbConnected()) {
      adminRecord = await Admin.findOne({ email: normalizedEmail });
    } else {
      adminRecord = inMemoryStore.admins.find((a) => a.email === normalizedEmail);
    }

    if (!adminRecord) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, adminRecord.passwordHash);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'dev-sketchbook-jwt-secret-key-2026';
    const payload = {
      id: adminRecord._id.toString(),
      email: adminRecord.email,
      role: adminRecord.role || 'admin',
    };

    const token = jwt.sign(payload, secret, { expiresIn: '7d' });

    // Set secure HTTP-only cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      admin: {
        id: adminRecord._id.toString(),
        email: adminRecord.email,
        name: adminRecord.name || 'Suraj Singh Bhandari',
        role: adminRecord.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('admin_token');
  res.json({ success: true, message: 'Logged out successfully.' });
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.admin) {
      res.status(401).json({ success: false, message: 'Not authenticated.' });
      return;
    }

    let adminRecord: any = null;
    if (isDbConnected()) {
      adminRecord = await Admin.findById(req.admin.id).select('-passwordHash');
    } else {
      adminRecord = inMemoryStore.admins.find((a) => a._id === req.admin?.id);
    }

    if (!adminRecord) {
      res.status(404).json({ success: false, message: 'Admin account not found.' });
      return;
    }

    res.json({
      success: true,
      admin: {
        id: adminRecord._id.toString(),
        email: adminRecord.email,
        name: adminRecord.name || 'Suraj Singh Bhandari',
        role: adminRecord.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
