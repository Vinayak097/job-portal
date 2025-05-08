// API configuration
export const API_CONFIG = {
  // Backend API URL
  BACKEND_URL: 'https://job-portal-e3s3.onrender.com',
  
  // API endpoints
  ENDPOINTS: {
    JOBS: '/api/jobs',
    SEARCH_JOBS: '/api/jobs/search',
  }
};

// Function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`;
};

export default API_CONFIG;
