import { Router } from 'express';
import {
  getAllNews, getBranches,
  getEvent,
  getEvents, getNews,
  getProgram,
  getPrograms, getPublication,
  getWebinar,
  getWebinars,
  postContact,
  getTeam
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

// Team Route
router.get("/team/:category", getTeam)

// Branches Route
router.get("/branches", getBranches)

// Publications Route
router.get("/publications", getPublication)

export default router;
