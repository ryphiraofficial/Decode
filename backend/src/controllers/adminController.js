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
  const admin = await Admin.findOne({ email: inputEmail });
  if (!admin || !(await admin.verifyPassword(inputPassword))) return res.status(401).json({ message: 'Incorrect email or password.' });
  res.json({ token: sign(admin) });
});
exports.getAccount = asyncHandler(async (req, res) => res.json({ email: req.admin.email }));
exports.updateAccount = asyncHandler(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const currentPassword = String(req.body.currentPassword || '');
  const newPassword = String(req.body.newPassword || '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: 'Enter a valid email address.' });
  if (newPassword && (newPassword.length < 8 || Buffer.byteLength(newPassword, 'utf8') > 72)) return res.status(400).json({ message: 'The new password must be at least 8 characters and no more than 72 bytes.' });
  const admin = await Admin.findById(req.admin._id);
  if (!admin || !(await admin.verifyPassword(currentPassword))) return res.status(401).json({ message: 'Your current password is incorrect.' });
  if (await Admin.exists({ email, _id: { $ne: admin._id } })) return res.status(409).json({ message: 'This email address is already in use.' });
  admin.email = email;
  if (newPassword) admin.passwordHash = await bcrypt.hash(newPassword, 12);
  await admin.save();
  res.json({ email: admin.email, message: 'Account settings updated.' });
});
exports.listJobs = asyncHandler(async (_req, res) => res.json(await Job.find().sort({ createdAt: -1 })));
exports.createJob = asyncHandler(async (req, res) => res.status(201).json(await Job.create(req.body)));
exports.updateJob = asyncHandler(async (req, res) => { const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!job) return res.status(404).json({ message: 'Position not found.' }); res.json(job); });
exports.deleteJob = asyncHandler(async (req, res) => { const job = await Job.findByIdAndDelete(req.params.id); if (!job) return res.status(404).json({ message: 'Position not found.' }); res.json({ message: 'Position deleted successfully.' }); });
exports.listApplications = asyncHandler(async (_req, res) => { const apps = await Application.find().populate('job', 'title').sort({ createdAt: -1 }).lean(); res.json(apps.map(a => ({ ...a, resumeUrl: `/api/admin/applications/${a._id}/resume` }))); });
exports.updateApplication = asyncHandler(async (req, res) => { const app = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }); if (!app) return res.status(404).json({ message: 'Application not found.' }); res.json(app); });
exports.deleteApplication = asyncHandler(async (req, res) => { const app = await Application.findByIdAndDelete(req.params.id); if (!app) return res.status(404).json({ message: 'Application not found.' }); res.json({ message: 'Application deleted successfully.' }); });
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
exports.exportApplications = asyncHandler(async (_req, res) => {
  const apps = await Application.find().populate('job', 'title department').sort({ createdAt: -1 }).lean();
  const rows = apps.map(a => ({
    'Candidate name': a.name,
    Email: a.email,
    Phone: a.phone,
    Portfolio: a.portfolio || '',
    Position: a.job?.title || a.enquiryType || 'General Career Enquiry',
    Department: a.job?.department || (a.enquiryType ? 'General Enquiry' : 'General'),
    Status: a.status,
    'Applied at': a.createdAt ? a.createdAt.toISOString() : '',
    'Cover note': a.coverNote
  }));
  const sheet = XLSX.utils.json_to_sheet(rows);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, 'Applications');
  const content = XLSX.write(book, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', 'attachment; filename="dcoode-career-applications.xlsx"');
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').send(content);
});
