import { Router } from 'express';
import { login, logout, getMe } from '../controllers/authController';
import { getDashboardStats } from '../controllers/dashboardController';
import { createProject, updateProject, deleteProject } from '../controllers/projectController';
import { createSkill, updateSkill, deleteSkill } from '../controllers/skillController';
import { createEducation, updateEducation, deleteEducation } from '../controllers/educationController';
import { updateJourney } from '../controllers/journeyController';
import { updateSettings } from '../controllers/settingsController';
import { createBeyondCode, updateBeyondCode, deleteBeyondCode } from '../controllers/beyondCodeController';
import { getMessages, markMessageRead, deleteMessage } from '../controllers/messageController';
import { authenticateAdmin } from '../middleware/auth';
import { loginLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public auth routes
router.post('/login', loginLimiter, login);
router.post('/logout', logout);

// Protected admin routes
router.use(authenticateAdmin);

router.get('/me', getMe);
router.get('/dashboard', getDashboardStats);

// Projects CRUD
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Skills CRUD
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// Education CRUD
router.post('/education', createEducation);
router.put('/education/:id', updateEducation);
router.delete('/education/:id', deleteEducation);

// Journey & Settings
router.put('/journey', updateJourney);
router.put('/settings', updateSettings);

// Beyond Code CRUD
router.post('/beyond-code', createBeyondCode);
router.put('/beyond-code/:id', updateBeyondCode);
router.delete('/beyond-code/:id', deleteBeyondCode);

// Messages Management
router.get('/messages', getMessages);
router.patch('/messages/:id/read', markMessageRead);
router.delete('/messages/:id', deleteMessage);

export default router;
