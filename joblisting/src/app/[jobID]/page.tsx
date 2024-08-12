import JobDetail from "@/components/jobDetail";
import { GetJobs } from "@/utils/fetchJobs";
import { notFound } from "next/navigation";

interface props {
  params: { jobID: number };
}
export default async function JobDetailPage({ params }: props) {
  const { job_postings } = await GetJobs();
  if (params.jobID >= job_postings.length) {
    return notFound();
  }
  return <JobDetail {...job_postings[params.jobID]} />;
}
