import JobDetail from "@/components/jobDetail";
import { GetJobs } from "@/utils/fetchJobs";
import { notFound } from "next/navigation";

interface props {
  params: { jobID: number };
}
export default async function JobDetailPage({ params }: props) {
  const result = await GetJobs();
  if (!result) {
    return notFound();
  }
  const { job_postings } = result;
  if (params.jobID >= job_postings.length) {
    return notFound();
  }
  return <JobDetail {...job_postings[params.jobID]} />;
}
