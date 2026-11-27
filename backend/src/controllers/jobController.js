const Job = require('../models/Job');
const Application = require('../models/Application');
const asyncHandler = require('../utils/asyncHandler');

exports.listPublished = asyncHandler(async (_req, res) => { const jobs = await Job.find({ published: true, $or: [{ closesAt: null }, { closesAt: { $gte: new Date() } }] }).sort({ createdAt: -1 }).lean(); res.json(jobs); });
exports.getPublished = asyncHandler(async (req, res) => { const job = await Job.findOne({ slug: req.params.slug, published: true }).lean(); if (!job) return res.status(404).json({ message: 'This position is no longer available.' }); res.json(job); });
exports.apply = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ slug: req.params.slug, published: true });
  if (!job) return res.status(404).json({ message: 'This position is no longer available.' });
  if (!req.file) return res.status(400).json({ message: 'Please attach your résumé.' });
  if (req.body.consent !== 'on' && req.body.consent !== 'true') return res.status(400).json({ message: 'Consent is required to submit an application.' });
  const resumeData = req.file.buffer ? req.file.buffer.toString('base64') : '';
  const application = await Application.create({
    job: job._id,
    enquiryType: 'Position Application',
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    portfolio: req.body.portfolio,
    coverNote: req.body.coverNote,
    resumePath: req.file.filename || req.file.originalname,
    resumeName: req.file.originalname,
    resumeData,
    resumeContentType: req.file.mimetype || 'application/pdf'
  });
  res.status(201).json({ id: application._id, message: 'Application received.' });
});

exports.submitGeneralEnquiry = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.phone || !req.body.coverNote) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }
  if (!req.file) return res.status(400).json({ message: 'Please attach your résumé.' });
  if (req.body.consent !== 'on' && req.body.consent !== 'true') {
    return res.status(400).json({ message: 'Consent is required to submit an enquiry.' });
  }
  const resumeData = req.file.buffer ? req.file.buffer.toString('base64') : '';
  const application = await Application.create({
    enquiryType: 'General Career Enquiry',
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    portfolio: req.body.portfolio || '',
    coverNote: req.body.coverNote,
    resumePath: req.file.filename || req.file.originalname,
    resumeName: req.file.originalname,
    resumeData,
    resumeContentType: req.file.mimetype || 'application/pdf'
  });
  res.status(201).json({ id: application._id, message: 'Career enquiry received successfully.' });
});
