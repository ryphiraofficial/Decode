const mongoose = require('mongoose');
const slugify = require('slugify');
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, index: true },
  department: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  mode: { type: String, enum: ['Remote', 'Hybrid', 'On-site'], required: true },
  type: { type: String, enum: ['Full time', 'Part time', 'Contract', 'Internship'], required: true },
  experience: { type: String, required: true },
  summary: { type: String, required: true, maxlength: 280 },
  description: { type: String, required: true },
  responsibilities: [{ type: String, required: true }],
  requirements: [{ type: String, required: true }],
  published: { type: Boolean, default: false },
  image: { type: String, default: '' },
  closesAt: Date
}, { timestamps: true });
jobSchema.pre('validate', function() {
  if (!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true });
});
module.exports = mongoose.model('Job', jobSchema);
