const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Job = require('../models/Job');

// Load environment variables
dotenv.config({ path: '../.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal')
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  });

// Read sample data
const sampleData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../sample-jobs.json'), 'utf-8')
);

// Seed the database
const seedDB = async () => {
  try {
    // Clear existing data
    await Job.deleteMany({});
    console.log('Cleared existing job data');

    // Insert new data
    await Job.insertMany(sampleData);
    console.log(`Inserted ${sampleData.length} job records`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
