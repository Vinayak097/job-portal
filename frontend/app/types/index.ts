export interface Job {
  _id: string;
  jobIdNumeric: string;
  title: string;
  company: string;
  location: string;
  job_link: string;
  seniority_level?: string;
  employment_type: string;
  source: string;
  experience: string;
  company_url?: string;
  companyImageUrl: string;
  postedDateTime: string;
  min_exp: number;
  max_exp: number;
  country: string;
  companytype?: string;
  description?: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface JobsResponse {
  jobs: Job[];
  pagination: PaginationInfo;
}
