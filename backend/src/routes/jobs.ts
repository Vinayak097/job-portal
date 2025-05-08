import express, { Request, Response, Router } from 'express';
import JobModel from '../models/Job';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const jobs = await JobModel.find()
      .skip(skip)
      .limit(limit);

    const total = await JobModel.countDocuments();

    res.json({
      jobs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/search', async (req: Request, res: Response): Promise<void> => {
  try {
    const location = req.query.location as string | undefined;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (location) {
      query = { location: { $regex: location, $options: 'i' } };
    }

    const jobs = await JobModel.find(query)
      .skip(skip)
      .limit(limit);

    const total = await JobModel.countDocuments(query);

    res.json({
      jobs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await JobModel.findById(req.params.id);

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
