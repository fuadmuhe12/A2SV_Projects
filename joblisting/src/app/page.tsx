import JobCard from "@/components/JobCard";
import { GetJobs } from "@/utils/fetchJobs";
import Image from "next/image";
import Link from "next/link";
type JobProps = {
  imgUrl: string;
  title: string;
  description: string;
  company: string;
  location: string;
  categories: string[];
};

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const { job_postings } = await GetJobs();
  return (
    <main className="px-5 pb-7">
      <div className="flex md:flex-row flex-col justify-between p-4">
        <div>
          <h1 className="font-[900] text-xl md:text-4xl text-[#25324B] pb-1">
            Opportunities
          </h1>
          <h2 className="text-[#7C8493]">Showing {job_postings.length} results</h2>
        </div>
        <div>
          <form>
            <label htmlFor="job_filter" className="text-[#7C8493]">
              Sort by:{" "}
            </label>
            <select id="job_filter" name="job_filter_name">
              <option value="Most relevant">Most relevant</option>
              <option value="recent">recent</option>
            </select>
          </form>
        </div>
      </div>

      <div className="gap-y-8 flex flex-col">
        {job_postings.map((value, ind) => {
          return (
            <Link key={ind} href={`${ind}`}>
              <JobCard
                categories={value.about.categories}
                company={value.company}
                description={value.description}
                imgUrl={`${value.image}`}
                location={value.about.location}
                title={value.title}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
