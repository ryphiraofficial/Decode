const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcryptjs');
const XLSX = require('xlsx');
const Admin = require('../models/Admin');
const Job = require('../models/Job');
const Application = require('../models/Application');
const asyncHandler = require('../utils/asyncHandler');
const sign = (admin) => jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET || 'local-dcoode-careers-secret', { expiresIn: '8h' });
exports.login = asyncHandler(async (req, res) => {
  const inputEmail = String(req.body.email || '').trim().toLowerCase();
  const inputPassword = String(req.body.password || '');
  const envEmail = (process.env.ADMIN_EMAIL || 'admin@dcoode.com').trim().toLowerCase();
  const envPassword = process.env.ADMIN_PASSWORD || 'DcoodeDev!2026';

  let admin = await Admin.findOne({ email: inputEmail });
  if (inputEmail === envEmail && inputPassword === envPassword) {
    if (!admin) {
      const passwordHash = await bcrypt.hash(envPassword, 12);
      admin = await Admin.create({ email: envEmail, passwordHash });
    } else {
      const valid = await admin.verifyPassword(inputPassword);
      if (!valid) {
        admin.passwordHash = await bcrypt.hash(envPassword, 12);
        await admin.save();
      }
    }
    return res.json({ token: sign(admin) });
  }

  if (!admin || !(await admin.verifyPassword(inputPassword))) return res.status(401).json({ message: 'Incorrect email or password.' });
  res.json({ token: sign(admin) });
});
exports.listJobs = asyncHandler(async (_req, res) => res.json(await Job.find().sort({ createdAt: -1 })));
exports.createJob = asyncHandler(async (req, res) => res.status(201).json(await Job.create(req.body)));
exports.updateJob = asyncHandler(async (req, res) => { const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!job) return res.status(404).json({ message: 'Position not found.' }); res.json(job); });
exports.deleteJob = asyncHandler(async (req, res) => { const job = await Job.findByIdAndDelete(req.params.id); if (!job) return res.status(404).json({ message: 'Position not found.' }); res.json({ message: 'Position deleted successfully.' }); });
exports.listApplications = asyncHandler(async (_req, res) => { const apps = await Application.find().populate('job', 'title').sort({ createdAt: -1 }).lean(); res.json(apps.map(a => ({ ...a, resumeUrl: `/api/admin/applications/${a._id}/resume` }))); });
exports.updateApplication = asyncHandler(async (req, res) => { const app = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }); if (!app) return res.status(404).json({ message: 'Application not found.' }); res.json(app); });
exports.downloadResume = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).json({ message: 'Application not found.' });
  if (app.resumeData) {
    res.setHeader('Content-Disposition', `attachment; filename="${app.resumeName}"`);
    res.setHeader('Content-Type', app.resumeContentType || 'application/pdf');
    return res.send(Buffer.from(app.resumeData, 'base64'));
  }
  const filePath = path.join(__dirname, '../../uploads', app.resumePath);
  if (require('fs').existsSync(filePath)) {
    return res.download(filePath, app.resumeName);
  }
  res.status(404).json({ message: 'Résumé file not found.' });
});
exports.exportApplications = asyncHandler(async (_req, res) => { const apps = await Application.find().populate('job', 'title department').sort({ createdAt: -1 }).lean(); const rows = apps.map(a => ({ 'Candidate name': a.name, Email: a.email, Phone: a.phone, Portfolio: a.portfolio || '', Position: a.job?.title || '', Department: a.job?.department || '', Status: a.status, 'Applied at': a.createdAt.toISOString(), 'Cover note': a.coverNote })); const sheet = XLSX.utils.json_to_sheet(rows); const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, 'Applications'); const content = XLSX.write(book, { type: 'buffer', bookType: 'xlsx' }); res.setHeader('Content-Disposition', 'attachment; filename="dcoode-career-applications.xlsx"'); res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').send(content); });
