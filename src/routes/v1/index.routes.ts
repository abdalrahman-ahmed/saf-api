import { Router } from 'express';
import {body} from "express-validator";
import {
  getAllNews, getBranches,
  getEvent,
  getEvents, getNews,
  getProgram,
  getPrograms,
  getWebinar,
  getWebinars,
  postContact,
  getTeam,
  getVideos,
  getFeatured,
  getVersions, getVersion
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

// Events Routes
router.get('/events', getEvents);
router.get('/event/:eventSlug', getEvent);

// Team Route
router.get("/team/:category", getTeam)

// Branches Route
router.get("/branches", getBranches)

router.get("/videos", getVideos)

router.get("/videos/featured", getFeatured)

router.get("/versions", getVersions)

router.get("/versions/:parent", getVersion)

router.post('/contact',[body("name").trim().notEmpty().withMessage((value, {req}) => {
  return req.t("Error.contact.name")
}),
  body("email").normalizeEmail().isEmail().withMessage((value, {req}) => {
    return req.t("Error.contact.email")
  }),
body("subject").trim().isLength({min: 4}).withMessage((value, {req}) => {
  return req.t("Error.contact.subject")
}),
body("message").trim().isLength({min: 10}).withMessage((value, {req}) => {
  return req.t("Error.contact.message")
})
], postContact);

export default router;
