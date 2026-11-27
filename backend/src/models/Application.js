const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: false, index: true },
  enquiryType: { type: String, default: 'Position Application' },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  portfolio: { type: String, trim: true },
  coverNote: { type: String, required: true, maxlength: 5000 },
  resumePath: { type: String, default: '' },
  resumeName: { type: String, required: true },
  resumeData: { type: String, default: '' },
  resumeContentType: { type: String, default: 'application/pdf' },
  status: { type: String, enum: ['New', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'], default: 'New' }
}, { timestamps: true });
applicationSchema.index({ job: 1, email: 1 }, { unique: true, partialFilterExpression: { job: { $type: 'objectId' } } });
module.exports = mongoose.model('Application', applicationSchema);
