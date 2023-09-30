"use client";


import { MdLocationOn } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SearchJobs = ({ searchTag, jobs }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const filterData = jobs?.filter(
      (item, index) =>
        item.tags.map(str => str.trim()).includes(searchTag?.toLowerCase()) ||
        item.data.location
          .toLowerCase()
          .split(",")
          .join(" ")
          .split(" ")
          .includes(searchTag?.toLowerCase()) ||
        item.data.comapny
          .toLowerCase()
          .split(",")
          .join(" ")
          .split(" ")
          .includes(searchTag?.toLowerCase()) ||
        item.data.comapny.toLowerCase() ===
          searchTag?.toLowerCase().split("%20").join(" ") ||
        item.data.title.toLowerCase() ===
          searchTag?.toLowerCase().split("%20").join(" ")
    );
    setData(filterData);
    console.log(jobs);
  }, [searchTag]);

  return (
    <>
      {data?.length === 0 && (
        <div>
          <h1 className="font-semibold">
            No result for {searchTag?.split("%20").join(" ")}
          </h1>
        </div>
      )}
      {data?.map((item) => {
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
                    {item.data.title}
                  </Link>
                </h3>
                <div className="text-xl font-bold mb-4">
                  {item.data.comapny}
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
                  {item.data.location}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SearchJobs;
