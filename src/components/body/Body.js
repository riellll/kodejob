"use client";
import Image from "next/image";

// import Search from "../shared/Search";
import Link from "next/link";
import PaginationComp from "./PaginationComp";
// import PaginationComp from "./PaginationComp";

// import useSWR from "swr";
// import Skeleton from "../shared/Skeleton";
import { MdLocationOn } from "react-icons/md";

// import { AuthRequiredError } from "@/lib/exceptions";

const Body = ({ jobs, page }) => {



  return (
    <>
      <div className="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4">
        {/* <!-- Item 2 --> */}
        {jobs?.jobRec.map((item) => {
          return (
            <div
              className="bg-gray-100 border border-gray-200 rounded p-6 dark:bg-gray-700 dark:border-gray-600"
              key={item._id}
            >
              <div className="flex">
                <Image
                  className="hidden w-48 max-h-40 mr-6 md:block"
                  src={item.logo}
                  alt="asme"
                  height={500}
                  width={500}
                  priority
                />
                <div>
                  <h3 className="text-2xl">
                    <Link href={`/show/${item._id}`}>
                      {item.data?.title}
                    </Link>
                  </h3>
                  <div className="text-xl font-bold mb-4">
                    {item.data?.comapny}
                  </div>
                  <ul className="flex">
                    {item.tags.map((tag) => (
                      <li
                        className="flex items-center justify-center bg-black text-white rounded-xl py-1 px-3 mr-2 text-xs"
                        key={tag}
                      >
                        <a href="#">{tag}</a>
                      </li>
                    ))}
                  </ul>
                  <div className="flex text-lg my-4">
                    <span className="text-2xl">
                      <MdLocationOn />
                    </span>
                    {item?.data.location}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <PaginationComp jobPage={jobs} page={page} />
      </div>
    </>
  );
};

export default Body;
