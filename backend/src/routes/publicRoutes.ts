import { Router } from 'express';
import { getProjects, getProjectBySlug } from '../controllers/projectController';
import { getSkills } from '../controllers/skillController';
import { getEducation } from '../controllers/educationController';
import { getJourney } from '../controllers/journeyController';
import { getSettings } from '../controllers/settingsController';
import { getBeyondCode } from '../controllers/beyondCodeController';
import { sendMessage } from '../controllers/messageController';
import { contactLimiter } from '../middleware/rateLimiter';

const router = Router();

router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);
router.get('/skills', getSkills);
router.get('/education', getEducation);
router.get('/journey', getJourney);
router.get('/site-settings', getSettings);
router.get('/beyond-code', getBeyondCode);
router.post('/contact', contactLimiter, sendMessage);

export default router;
