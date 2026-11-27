const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const upload = require('../middleware/upload');
const jobs = require('../controllers/jobController');
const applyLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 6, standardHeaders: true });

router.get('/jobs', jobs.listPublished);
router.get('/jobs/:slug', jobs.getPublished);
router.post('/jobs/:slug/applications', applyLimiter, upload.single('resume'), jobs.apply);
router.post('/enquiry', applyLimiter, upload.single('resume'), jobs.submitGeneralEnquiry);
module.exports = router;
