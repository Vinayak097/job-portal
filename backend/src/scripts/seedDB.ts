import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobModel from '../models/Job';
import { Job } from '../types';

dotenv.config();

const seedDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');

    // Clear existing data
    await JobModel.deleteMany({});
    console.log('Cleared existing job data');

    // Read sample data
    // const jobsData = JSON.parse(
    //   fs.readFileSync(path.join(__dirname, '../../../sample-jobs.json'), 'utf-8')
    // ) as Omit<Job, '_id'>[];

    // Insert new data
    // await JobModel.insertMany(jobsData);
    // console.log(`Inserted ${jobsData.length} job records`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
