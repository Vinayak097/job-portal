"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Job_1 = __importDefault(require("../models/Job"));
dotenv_1.default.config();
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal';
        yield mongoose_1.default.connect(mongoURI);
        console.log('MongoDB connected successfully');
        // Clear existing data
        yield Job_1.default.deleteMany({});
        console.log('Cleared existing job data');
        const jobsData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../../../sample-jobs.json'), 'utf-8'));
        const cleanedJobsData = jobsData.map((job) => {
            var _a;
            // Handle different formats of Job ID
            let jobId = job["Job ID (Numeric)"] || "0";
            if (typeof jobId === 'object' && jobId.$numberLong) {
                jobId = jobId.$numberLong.toString();
            }
            else if (typeof jobId === 'object') {
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
                postedDateTime: new Date(((_a = job.postedDateTime) === null || _a === void 0 ? void 0 : _a.$date) || job.postedDateTime || new Date()),
                min_exp: job.min_exp || 0,
                max_exp: job.max_exp || 0,
                country: job.country || "Unknown",
                companytype: job.companytype || "Unknown"
            };
        });
        yield Job_1.default.insertMany(cleanedJobsData);
        console.log(`Inserted ${jobsData.length} job records`);
        console.log('Database seeded successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
});
seedDatabase();
