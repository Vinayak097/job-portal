const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  employmentType: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance']
  },
  postedDate: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  experienceRange: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create index for location field for faster search
jobSchema.index({ location: 'text' });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
