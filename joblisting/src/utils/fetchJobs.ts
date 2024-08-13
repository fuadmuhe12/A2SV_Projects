import { promises as fs } from "fs";
import path from "path";
import { Job } from "@/interfaces/Job";

export const GetJobs = async (): Promise<
  { job_postings: Job[] } | undefined
> => {
  try {
    // Construct the absolute path to the JSON file
    const filePath = path.join(process.cwd(), "src/api/db/jobs.json");

    // Read the file content
    const fileContent = await fs.readFile(filePath, "utf8");

    // Parse and return the JSON object
    const jobs = JSON.parse(fileContent) as { job_postings: Job[] };
    return jobs;
  } catch (error) {
    console.error("Failed to load jobs:", error);
    return undefined;
  }
};
