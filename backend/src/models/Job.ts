import mongoose, { Document, Schema } from 'mongoose';
import { Job as JobType } from '../types';

export interface JobDocument extends Omit<JobType, '_id'>, Document {}

const JobSchema = new Schema({
  jobIdNumeric: { type: String, required: true, alias: 'Job ID (Numeric)' },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  job_link: { type: String, required: true },
  seniority_level: { type: String },
  employment_type: { type: String, required: true },
  source: { type: String, required: true },
  experience: { type: String, required: true },
  company_url: { type: String },
  companyImageUrl: { type: String, required: true },
  postedDateTime: { type: Date, required: true },
  min_exp: { type: Number, required: true },
  max_exp: { type: Number, required: true },
  country: { type: String },
  companytype: { type: String }
});

JobSchema.index({ location: 'text' });

export default mongoose.model<JobDocument>('Job', JobSchema);
