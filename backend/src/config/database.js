const mongoose = require('mongoose');

async function connectDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error('MongoDB is not configured. Copy .env.example to .env in the backend folder, then set MONGODB_URI and JWT_SECRET.');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
}
module.exports = connectDatabase;
