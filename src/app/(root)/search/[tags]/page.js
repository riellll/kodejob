// import Navbar from "@/app/components/Navbar";
// import Refresh from "@/components/Refresh";

// import SearchTags from "@/data/SearchTags";
import { BsArrowLeft } from "react-icons/bs";
// import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/shared/Hero";
import Search from "@/components/shared/Search";

// import jobData from "@/data/Data";
// import useSWR from "swr";
// import { useState, useEffect } from "react";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { searchPost } from "@/lib/actions/Postjob.action";
// import jobData from "@/fetchData/Data";
// import Skeleton from "@/app/components/Skeleton";
export async function generateMetadata({ params }) {
  return {
    title: `${params.tags} Jobs`,
    description: "Searching for jobs",
  };
}

const SearchTag = async ({ params }) => {
  const { tags: searchTag } = params;
  const jobs = await searchPost();

  const filterData = jobs?.filter(
    (item, index) =>
      item.tags.includes(searchTag?.toLowerCase()) ||
      item.data
        .get("location")
        .toLowerCase()
        .split(",")
        .join(" ")
        .split(" ")
        .includes(searchTag?.toLowerCase()) ||
      item.data
        .get("comapny")
        .toLowerCase()
        .split(",")
        .join(" ")
        .split(" ")
        .includes(searchTag?.toLowerCase()) ||
      item.data.get("comapny").toLowerCase() ===
        searchTag?.toLowerCase().split("%20").join(" ") ||
      item.data.get('title').toLowerCase() ===
        searchTag?.toLowerCase().split("%20").join(" ")
  );

  // console.log(jobs)
  return (
    <>
      <Hero />
      <Search />

      {/* {session.status === "loading" ? (
        <div className="text-center">
          <h1 className="font-semibold">Loading...</h1>
        </div>
      ) : ( */}
      <div className="flex justify-self-start">
        <Link
          href="/"
          className="flex gap-1 justify-self-start text-black dark:text-white ml-4 mb-4"
        >
          <span className="pt-1">
            <BsArrowLeft />
          </span>{" "}
          <span>Back</span>
        </Link>
      </div>

      <div className="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4 mb-48">
        {/* {isLoading && <Skeleton />} */}
        {filterData?.length === 0 && (
          <div>
            <h1 className="font-semibold">
              No result for {searchTag?.split("%20").join(" ")}
            </h1>
          </div>
        )}
        {filterData?.map((item) => {
          return (
            <div
              className="bg-gray-50 border border-gray-200 rounded p-6 dark:bg-gray-700 dark:border-gray-600"
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
                      {item.data.get("title")}
                    </Link>
                  </h3>
                  <div className="text-xl font-bold mb-4">
                    {item.data.get("comapny")}
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
                    {item.data.get("location")}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchTag;
