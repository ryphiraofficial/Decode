const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const upload = require('../middleware/upload');
const jobs = require('../controllers/jobController');
router.get('/jobs', jobs.listPublished);
router.get('/jobs/:slug', jobs.getPublished);
router.post('/jobs/:slug/applications', rateLimit({ windowMs: 15 * 60 * 1000, max: 6, standardHeaders: true }), upload.single('resume'), jobs.apply);
module.exports = router;
