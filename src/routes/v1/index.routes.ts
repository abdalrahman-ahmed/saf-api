import { Router } from 'express';
import {
  getEvent,
  getEvents,
  getProgram,
  getPrograms,
  getWebinar,
  getWebinars,
  postContact,
} from '../../controllers';

const router: Router = Router();

// Programs Routes
router.get('/programs', getPrograms);
router.get('/program/:programSlug', getProgram);

// Webinars Routes
router.get('/webinars', getWebinars);
router.get('/webinars/:webinarSlug', getWebinar);
router.post('/contact', postContact);

// Events Routes
router.get('/events', getEvents);
router.get('/event/:eventSlug', getEvent);

export default router;
