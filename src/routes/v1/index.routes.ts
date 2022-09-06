import { Router } from 'express';
import {
  getAllNews,
  getEvent,
  getEvents, getNews,
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

// News Routes
router.get('/news', getAllNews);
router.get('/news/:newsSlug', getNews);


// Webinars Routes
router.get('/webinars', getWebinars);
router.get('/webinars/:webinarSlug', getWebinar);
router.post('/contact', postContact);

// Events Routes
router.get('/events', getEvents);
router.get('/event/:eventSlug', getEvent);

export default router;
