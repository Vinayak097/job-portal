# Job Portal Web Application

A full-stack job listing web application where users can view job opportunities, search by location, and view detailed job information.

## Features

- Display a list of jobs on the left-hand side of the screen
- When a job is clicked, display the corresponding job details on the right-hand side
- Search functionality to filter jobs by location
- Responsive design that works on desktop and mobile devices

## Tech Stack

### Frontend
- Next.js with TypeScript
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js with Express.js
- MongoDB with Mongoose for database operations
- RESTful API architecture

## Project Structure

```
job-portal/
├── backend/               # Backend server code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── scripts/           # Database seeding scripts
│   └── server.js          # Express server setup
├── frontend/              # Next.js frontend
│   ├── app/               # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── types/         # TypeScript type definitions
│   │   ├── page.tsx       # Main page component
│   │   └── layout.tsx     # App layout
│   └── public/            # Static assets
└── sample-jobs.json       # Sample job data for seeding
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation and Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd job-portal
   ```

2. Backend Setup:
   ```
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/job-portal
   PORT=5000
   ```

4. Seed the database with sample data:
   ```
   npm run seed
   ```

5. Start the backend server:
   ```
   npm run dev
   ```

6. Frontend Setup (in a new terminal):
   ```
   cd ../frontend
   npm install
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/search?location=<location>` - Search jobs by location
- `GET /api/jobs/:id` - Get a specific job by ID

## Deployment

### Backend Deployment
The backend can be deployed on platforms like Railway.app, Heroku, or any other Node.js hosting service.

### Frontend Deployment
The frontend can be deployed on Vercel or any other Next.js compatible hosting service.

## Future Enhancements

- Add authentication for job seekers and employers
- Implement job application functionality
- Add more search filters (job type, experience level, etc.)
- Add pagination for large job lists
- Implement job posting functionality for employers

## License

This project is licensed under the MIT License.
