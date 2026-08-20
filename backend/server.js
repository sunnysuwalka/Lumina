import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import departmentRoutes from "./routes/departmentRoutes.js"

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

// ISP DNS blocking ko bypass karne ke liye Google DNS set kar rahe hain
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173'; 

const app = express();

app.use(cors({
  origin: frontendURL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));



// Middleware
app.use(express.json());


app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/departments', departmentRoutes)
app.get('/api/auth/test', (req, res) => res.send('API is working!'));

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });