const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../controllers/adminController');

const loginAttempts = new Map();

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  let ip = forwarded ? forwarded.split(',')[0].trim() : (req.ip || req.socket?.remoteAddress || '');
  if (ip === '::1' || ip === '::ffff:127.0.0.1') ip = '127.0.0.1';
  return ip;
};

const getRateLimitConfig = () => ({
  max: Number(process.env.LOGIN_RATE_LIMIT_MAX || 5),
  windowMs: Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS || ((Number(process.env.LOGIN_RATE_LIMIT_MINUTES) || 15) * 60 * 1000))
});

function checkLock(key) {
  const { max } = getRateLimitConfig();
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry) return null;
  if (now > entry.resetTime) {
    loginAttempts.delete(key);
    return null;
  }
  if (entry.count >= max) {
    const minutes = Math.max(1, Math.ceil((entry.resetTime - now) / 60000));
    return process.env.LOGIN_RATE_LIMIT_MESSAGE || `Too many failed login attempts. Please wait ${minutes} minutes before trying again.`;
  }
  return null;
}

function recordFail(key) {
  const { windowMs } = getRateLimitConfig();
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry || now > entry.resetTime) {
    loginAttempts.set(key, { count: 1, resetTime: now + windowMs });
  } else {
    entry.count += 1;
  }
}

function clearLock(key) {
  loginAttempts.delete(key);
}

router.get('/login-status', (req, res) => {
  const email = String(req.query.email || process.env.ADMIN_EMAIL || 'admin@dcoode.com').trim().toLowerCase();
  const ip = getClientIp(req);
  const emailLock = checkLock(`email:${email}`);
  const ipLock = checkLock(`ip:${ip}`);
  const message = emailLock || ipLock;
  if (message) return res.json({ locked: true, message });
  res.json({ locked: false });
});

const loginRateLimiter = (req, res, next) => {
  const email = String(req.body?.email || process.env.ADMIN_EMAIL || 'admin@dcoode.com').trim().toLowerCase();
  const ip = getClientIp(req);
  const emailLock = checkLock(`email:${email}`);
  const ipLock = checkLock(`ip:${ip}`);
  const lockMessage = emailLock || ipLock;
  if (lockMessage) return res.status(429).json({ message: lockMessage });

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode >= 200 && res.statusCode < 300 && body?.token) {
      clearLock(`email:${email}`);
      clearLock(`ip:${ip}`);
    } else if (res.statusCode === 401) {
      recordFail(`email:${email}`);
      recordFail(`ip:${ip}`);
      const updatedLock = checkLock(`email:${email}`) || checkLock(`ip:${ip}`);
      if (updatedLock) {
        res.status(429);
        return originalJson({ message: updatedLock });
      }
    }
    return originalJson(body);
  };
  next();
};

router.post('/login', loginRateLimiter, admin.login);
router.use(auth);
router.get('/jobs', admin.listJobs); router.post('/jobs', admin.createJob); router.patch('/jobs/:id', admin.updateJob); router.delete('/jobs/:id', admin.deleteJob);
router.get('/applications', admin.listApplications); router.patch('/applications/:id', admin.updateApplication); router.get('/applications/:id/resume', admin.downloadResume); router.get('/applications/export.xlsx', admin.exportApplications);
module.exports = router;
