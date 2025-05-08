import React from 'react';
import { Job } from '../types';

interface JobDetailProps {
  job: Job | null;
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  if (!job) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 h-full flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <svg className="h-16 w-16 text-gray-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No job selected</h3>
          <p className="text-gray-500 text-center max-w-md">Select a job from the list to view its details here. You can browse through available positions and find the perfect match for your skills.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 h-full flex flex-col">
      <div className="job-detail-container p-6 flex-grow overflow-y-auto">
        <div className="flex items-start mb-2 pb-4 border-b border-gray-100">
          <div className="mr-4 flex-shrink-0">
            {job.companyImageUrl ? (
              <img
                src={job.companyImageUrl}
                alt={`${job.company} logo`}
                className="h-16 w-16 object-contain rounded-md border border-gray-200"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/64?text=' + job.company.charAt(0);
                }}
              />
            ) : (
              <div className="h-16 w-16 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl border border-blue-200">
                {job.company.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h2>
            <p className="text-lg text-gray-700 mb-2">{job.company}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={job.job_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Apply Now
              </a>
              {job.company_url && (
                <a
                  href={job.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Company Website
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {job.employment_type}
          </span>
          {job.seniority_level && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {job.seniority_level}
            </span>
          )}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {job.experience}
          </span>
          {job.source && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              {job.source}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Location</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Experience</p>
              <p className="text-sm text-gray-500">{job.min_exp}-{job.max_exp} years</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Posted Date</p>
              <p className="text-sm text-gray-500">{new Date(job.postedDateTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          {job.country && (
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Country</p>
                <p className="text-sm text-gray-500">{job.country}</p>
              </div>
            </div>
          )}

          {job.companytype && (
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Company Size</p>
                <p className="text-sm text-gray-500">{job.companytype}</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t pt-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="h-8 w-1 bg-blue-500 rounded-full mr-3"></div>
            <h3 className="text-xl font-semibold text-gray-900">Job Description</h3>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="prose prose-blue max-w-none text-gray-700">
              <p className="whitespace-pre-line">
                {job.description ||
                  `This is a ${job.employment_type} position at ${job.company} for a ${job.title} role.

                  The job requires ${job.experience} of experience in the field.

                  Location: ${job.location}

                  This job was posted on ${new Date(job.postedDateTime).toLocaleDateString()} and is sourced from ${job.source}.`
                }
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center mb-4">
            <div className="h-8 w-1 bg-green-500 rounded-full mr-3"></div>
            <h3 className="text-xl font-semibold text-gray-900">Apply for this job</h3>
          </div>
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
            <p className="text-gray-700 mb-4">Ready to apply for this position? Click the button below to submit your application.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={job.job_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Apply Now
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              {job.company_url && (
                <a
                  href={job.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Visit Company
                  <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
