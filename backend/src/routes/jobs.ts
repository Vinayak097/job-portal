import express, { Request, Response, Router } from 'express';
import JobModel from '../models/Job';

const router: Router = express.Router();

router.get('/', async (_: Request, res: Response): Promise<void> => {
  try {
    const jobs = await JobModel.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/search', async (req: Request, res: Response): Promise<void> => {
  try {
    const location = req.query.location as string | undefined;

    if (!location) {
      const jobs = await JobModel.find();
      res.json(jobs);
      return;
    }

    const jobs = await JobModel.find({
      location: { $regex: location, $options: 'i' }
    });

    res.json(jobs);
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
