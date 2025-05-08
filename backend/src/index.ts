import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import jobRoutes from './routes/jobs';

dotenv.config();

connectDB();

const app = express();

// Configure CORS to allow requests from any origin
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/jobs', jobRoutes);

app.get('/', (_: Request, res: Response): void => {
  res.send('Job Portal API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
