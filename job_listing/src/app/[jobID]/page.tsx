import JobDetail from "@/components/jobDetail";
import { GetJobs } from "@/utils/fetchJobs";
import { notFound } from "next/navigation";
import Error from "next/error";

interface props {
  params: { jobID: number };
}
export default async function JobDetailPage({ params }: props) {
  const result = await GetJobs();
  if (!result) {
    return <Error title="fetch faild" statusCode={404} />;
  }
  const { job_postings } = result;
  if (params.jobID >= job_postings.length) {
    return notFound();
  }
  return <JobDetail {...job_postings[params.jobID]} />;
}
