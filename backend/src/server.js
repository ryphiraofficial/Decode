require('dotenv').config();
const express = require('express'); const cors = require('cors'); const path = require('path');
const connectDatabase = require('./config/database'); const publicRoutes = require('./routes/publicRoutes'); const adminRoutes = require('./routes/adminRoutes');
const app = express();
app.set('trust proxy', 1);
const clientOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(o => o.trim().replace(/\/$/, '')).filter(Boolean);
app.use(cors({ origin: (origin, cb) => cb(null, !origin || clientOrigins.includes(origin) || clientOrigins.includes('*')), methods: ['GET','POST','PATCH','DELETE'], allowedHeaders: ['Content-Type','Authorization'] }));
app.use(express.json({ limit: '4.5mb' })); app.use(express.urlencoded({ extended: true, limit: '4.5mb' }));
app.use(async (_req, _res, next) => { try { await connectDatabase(); next(); } catch (err) { next(err); } });
app.get('/health', (_req,res) => res.json({ status: 'ok' })); app.use('/api', publicRoutes); app.use('/api/admin', adminRoutes);
app.use((error, _req, res, _next) => { if (error.code === 11000) return res.status(409).json({ message: 'An application has already been submitted using this email for this position.' }); if (error instanceof Error && (error.name === 'MulterError' || error.message.includes('résumé'))) return res.status(400).json({ message: error.message }); console.error(error); res.status(500).json({ message: 'Something went wrong. Please try again.' }); });

if (require.main === module || !process.env.VERCEL) {
  connectDatabase().then(async () => {
    const Admin = require('./models/Admin');
    const bcrypt = require('bcryptjs');
    const email = (process.env.ADMIN_EMAIL || 'admin@dcoode.com').trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD || 'DcoodeDev!2026';
    if (email && password && !(await Admin.exists({}))) {
      const passwordHash = await bcrypt.hash(password, 12);
      await Admin.create({ email, passwordHash });
    }
    app.listen(process.env.PORT || 5000, () => console.log(`API running on port ${process.env.PORT || 5000}`));
  }).catch(error => { console.error(error.message); process.exit(1); });
}

module.exports = app;
