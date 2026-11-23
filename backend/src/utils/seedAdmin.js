require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDatabase = require('../config/database');
const Admin = require('../models/Admin');
const mongoose = require('mongoose');
async function seedAdmin() {
  const production = process.env.NODE_ENV === 'production';
  const email = (process.env.ADMIN_EMAIL || (!production && 'admin@dcoode.com') || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || (!production && 'DcoodeDev!2026') || '';
  if (!email || !password) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD for production.');
  await connectDatabase();
  const existing = await Admin.findOne({ email });
  const passwordHash = await bcrypt.hash(password, 12);
  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`Admin ${email} password updated.`);
    return;
  }
  await Admin.create({ email, passwordHash });
  console.log(`Admin account created: ${email}`);
}
seedAdmin().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => mongoose.disconnect());
