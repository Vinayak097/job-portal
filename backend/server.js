const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const jobsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../sample-jobs.json'), 'utf-8')
);

const jobs = jobsData.map((job, index) => ({
  ...job,
  _id: (index + 1).toString()
}));

app.get('/api/jobs', (_, res) => {
  res.json(jobs);
});

app.get('/api/jobs/search', (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.json(jobs);
  }

  const filteredJobs = jobs.filter(job =>
    job.location.toLowerCase().includes(location.toLowerCase())
  );

  res.json(filteredJobs);
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(job => job._id === req.params.id);

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.json(job);
});

app.get('/', (_, res) => {
  res.send('Job Portal API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
