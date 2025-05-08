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


    const jobsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../../sample-jobs.json'), 'utf-8')
    ) as Omit<Job, '_id'>[];
    const cleanedJobsData = jobsData.map((job:any) => {
      // Handle different formats of Job ID
      let jobId = job["Job ID (Numeric)"] || "0";
      if (typeof jobId === 'object' && jobId.$numberLong) {
        jobId = jobId.$numberLong.toString();
      } else if (typeof jobId === 'object') {
        jobId = JSON.stringify(jobId);
      }

      // Handle different formats of companyImageUrl
      let imageUrl = job.companyImageUrl || "";
      if (typeof imageUrl === 'object') {
        imageUrl = "https://via.placeholder.com/100"; // Default placeholder image
      }

      return {
        jobIdNumeric: jobId,
        title: job.title || "Untitled Job",
        company: job.company || "Unknown Company",
        location: job.location || "Remote",
        job_link: job.job_link || "#",
        seniority_level: job.seniority_level || "Not specified",
        employment_type: job.employment_type || "Full time",
        source: job.source || "Unknown",
        experience: job.experience || "Not specified",
        company_url: typeof job.company_url === 'string' ? job.company_url : '',
        companyImageUrl: imageUrl,
        postedDateTime: new Date(job.postedDateTime?.$date || job.postedDateTime || new Date()),
        min_exp: job.min_exp || 0,
        max_exp: job.max_exp || 0,
        country: job.country || "Unknown",
        companytype: job.companytype || "Unknown"
      };
    });

    await JobModel.insertMany(cleanedJobsData);
    console.log(`Inserted ${jobsData.length} job records`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
