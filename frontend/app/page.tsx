'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import SearchBar from './components/SearchBar';
import { Job, PaginationInfo } from './types';
import { API_CONFIG, getApiUrl } from './config';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchLocation, setSearchLocation] = useState<string>('');


  const createMockData = (page: number): { jobs: Job[], pagination: PaginationInfo } => {
    const mockJobs: Job[] = Array.from({ length: 10 }, (_, i) => ({
      _id: `mock-${i + 1 + (page - 1) * 10}`,
      jobIdNumeric: `${i + 1 + (page - 1) * 10}`,
      title: `Sample Job ${i + 1 + (page - 1) * 10}`,
      company: 'Demo Company',
      location: 'Remote',
      job_link: '#',
      employment_type: 'Full-time',
      source: 'Sample Data',
      experience: '1-3 years',
      companyImageUrl: '',
      postedDateTime: new Date().toISOString(),
      min_exp: 1,
      max_exp: 3,
      country: 'Sample Country',
      description: 'This is a sample job description used when the API is unavailable.'
    }));

    return {
      jobs: mockJobs,
      pagination: {
        total: 100,
        page: page,
        limit: 10,
        pages: 10
      }
    };
  };

  const fetchJobs = async (page: number = 1, location: string = '') => {
    try {
      setLoading(true);
      setError(null);

      let url = getApiUrl(`${API_CONFIG.ENDPOINTS.JOBS}?page=${page}&limit=10`);

      if (location) {
        url = getApiUrl(`${API_CONFIG.ENDPOINTS.SEARCH_JOBS}?location=${location}&page=${page}&limit=10`);
      }

      console.log('Fetching URL:', url);

      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('API Response:', response.data);

      let jobsData: Job[] = [];
      let paginationData: PaginationInfo | null = null;

      if (response.data) {
        if (Array.isArray(response.data)) {
          jobsData = response.data;
          paginationData = {
            total: response.data.length,
            page: page,
            limit: 10,
            pages: Math.ceil(response.data.length / 10)
          };
        } else if (response.data.jobs && Array.isArray(response.data.jobs)) {
          jobsData = response.data.jobs;
          paginationData = response.data.pagination || {
            total: response.data.jobs.length,
            page: page,
            limit: 10,
            pages: Math.ceil(response.data.jobs.length / 10)
          };
        } else {
          console.error('Unexpected API response format:', response.data);
          setError('Received unexpected data format from server');

          const mockData = createMockData(page);
          setJobs(mockData.jobs);
          setPagination(mockData.pagination);

          if (!selectedJob && mockData.jobs.length > 0) {
            setSelectedJob(mockData.jobs[0]);
          }

          setLoading(false);
          return;
        }
      } else {
        console.error('No data received from API');
        setError('No data received from server');

        const mockData = createMockData(page);
        setJobs(mockData.jobs);
        setPagination(mockData.pagination);

        if (!selectedJob && mockData.jobs.length > 0) {
          setSelectedJob(mockData.jobs[0]);
        }

        setLoading(false);
        return;
      }

      setJobs(jobsData);
      setPagination(paginationData);

      if (jobsData.length === 0 && paginationData && paginationData.total > 0 && page > 1) {
        setCurrentPage(1);
        fetchJobs(1, location);
        return;
      }

      if (!selectedJob && jobsData.length > 0) {
        setSelectedJob(jobsData[0]);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching jobs:', err);

      if (err instanceof Error) {
        if (axios.isAxiosError(err)) {
          if (err.code === 'ECONNABORTED') {
            setError('Request timed out. The server might be experiencing high load.');
          } else if (err.response) {
            setError(`Server error: ${err.response.status} ${err.response.statusText}`);
          } else if (err.request) {
            setError('No response from server. Please check your connection or try again later.');
          } else {
            setError(`Error: ${err.message}`);
          }
        } else {
          setError(`Error: ${err.message}`);
        }
      } else {
        setError('An unknown error occurred');
      }

      const mockData = createMockData(page);
      setJobs(mockData.jobs);
      setPagination(mockData.pagination);

      if (!selectedJob && mockData.jobs.length > 0) {
        setSelectedJob(mockData.jobs[0]);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(`Fetching jobs for page ${currentPage} with search: ${searchLocation || 'none'}`);
    fetchJobs(currentPage, searchLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Handle job selection
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  // Handle location search
  const handleSearch = async (location: string) => {
    setSearchLocation(location);
    setCurrentPage(1); // Reset to first page on new search
    fetchJobs(1, location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h1 className="text-3xl font-bold text-gray-900">Job <span className="text-blue-600">Portal</span></h1>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-gray-500">Find your dream job today</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-3">Search Jobs</h2>
            <SearchBar onSearch={handleSearch} />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Mobile View - Conditional rendering based on selection */}
              <div className="md:hidden">
                {!selectedJob ? (
                  <JobList
                    jobs={jobs}
                    selectedJobId={null}
                    onSelectJob={handleSelectJob}
                    pagination={pagination || undefined}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <div className="h-full flex flex-col">
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="mb-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="mr-2 -ml-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Back to Jobs
                    </button>
                    <div className="flex-grow overflow-hidden">
                      <JobDetail job={selectedJob} />
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop View - Side by side layout */}
              <div className="hidden md:grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <JobList
                    jobs={jobs}
                    selectedJobId={selectedJob ? selectedJob._id : null}
                    onSelectJob={handleSelectJob}
                    pagination={pagination || undefined}
                    onPageChange={handlePageChange}
                  />
                </div>
                <div className="md:col-span-2 md:sticky md:top-0 md:h-[calc(100vh-120px)] md:overflow-y-auto">
                  <JobDetail job={selectedJob} />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
