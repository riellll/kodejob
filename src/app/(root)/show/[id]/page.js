
import ShowJobs from "@/components/show_comp/ShowJobs";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import Search from "@/components/shared/Search";
import IndividualJob from "@/fetchData/IndividualJob";
import { Suspense } from "react";
import Spinner from "@/components/shared/Spinner";

export async function generateMetadata({ params }) {
  const job = await IndividualJob(params.id);

  return {
    title: job.data.title,
    description: job.data.desc,
  };
}

const Show = async ({ params }) => {
  const job = await IndividualJob(params.id);


// console.log(job);
  return (
    <>
      <main>
        {/* <!-- Search --> */}
        <Search />
        <div className="flex justify-self-start">
          <Link
            href="/"
            className="flex gap-1 justify-self-start text-black ml-4 mb-4"
          >
            <span className="pt-1">
              <BsArrowLeft />
            </span>{" "}
            <span className="">Back</span>
          </Link>
        </div>
        <Suspense fallback={<Spinner/>}>
        <ShowJobs job={job} />
        </Suspense>
      </main>
    </>
  );
};

export default Show;
