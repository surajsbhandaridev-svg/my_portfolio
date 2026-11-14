import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Check token in signed/unsigned cookies or Authorization header
  let token = req.cookies?.admin_token;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Authentication required. No session token found.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'dev-sketchbook-jwt-secret-key-2026';
    const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string };
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
    return;
  }
};
