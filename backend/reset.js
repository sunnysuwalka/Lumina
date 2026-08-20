import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import dns from 'dns';
import User from './models/User.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const employeeId = 'EMP-001';
const newPassword = 'test123';

try {
  await mongoose.connect(process.env.MONGO_URI);

  console.log('Connected to MongoDB successfully!');

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await User.findOneAndUpdate(
    { employeeId },
    { password: hashedPassword },
    { new: true }
  );

  if (!user) {
    console.log(`User not found: ${employeeId}`);
  } else {
    console.log(`Password reset successfully for ${employeeId}`);
    console.log(`New password: ${newPassword}`);
  }
} catch (error) {
  console.error('Password reset error:', error);
} finally {
  await mongoose.disconnect();
}