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
const express_1 = __importDefault(require("express"));
const Job_1 = __importDefault(require("../models/Job"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        console.log(`GET /api/jobs - Page: ${page}, Limit: ${limit}, Skip: ${skip}`);
        const jobs = yield Job_1.default.find()
            .skip(skip)
            .limit(limit);
        const total = yield Job_1.default.countDocuments();
        console.log(`Found ${jobs.length} jobs out of ${total} total`);
        res.json({
            jobs,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    }
    catch (error) {
        console.error('Error in GET /api/jobs:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}));
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = req.query.location;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        console.log(`GET /api/jobs/search - Location: ${location}, Page: ${page}, Limit: ${limit}, Skip: ${skip}`);
        let query = {};
        if (location) {
            query = { location: { $regex: location, $options: 'i' } };
        }
        const jobs = yield Job_1.default.find(query)
            .skip(skip)
            .limit(limit);
        const total = yield Job_1.default.countDocuments(query);
        console.log(`Search found ${jobs.length} jobs out of ${total} total matching jobs`);
        res.json({
            jobs,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    }
    catch (error) {
        console.error('Error in GET /api/jobs/search:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job_1.default.findById(req.params.id);
        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }
        res.json(job);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
exports.default = router;
