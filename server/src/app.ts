import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db.config.js';
import authRoutes from './routes/auth/auth.routes.js'
import adminRoutes from './routes/admin/admin.routes.js'
const app = express()
app.use(cors())
app.use(express.json())

// routes

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// connecting to DB
connectDB();
export default app;