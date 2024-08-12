import { Job } from "@/interfaces/Job";

export const GetJobs = async (): Promise<{ job_postings: Job[] }> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const result = await fetch(`${baseUrl}/db/jobs.json`,{ cache: 'no-store' } );

  const jobs = await result.json();
  return jobs;
};
