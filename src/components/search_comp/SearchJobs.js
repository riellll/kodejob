"use client";

// import Refresh from "@/app/components/Refresh";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import Skeleton from "@/components/shared/Skeleton";
import { AuthRequiredError } from "@/lib/exceptions";

const SearchJobs = ({ search }) => {
  const [filData, setFilData] = useState([]);
  const [err, setErr] = useState(false);



  /*   useEffect(() => {
    function mutation() {
      mutate();
    }
    mutation()
  }, [search]); */
  // console.log(search);
  useEffect(() => {
    const filterData = data?.filter(
      (item, index) =>
        item.tags.includes(search?.toLowerCase()) ||
        item.data.location
          .toLowerCase()
          .split(",")
          .join(" ")
          .split(" ")
          .includes(search?.toLowerCase()) ||
        item.data.comapny
          .toLowerCase()
          .split(",")
          .join(" ")
          .split(" ")
          .includes(search?.toLowerCase()) ||
        item.data.comapny.toLowerCase() ===
          search?.toLowerCase().split("%20").join(" ") ||
        item.data.title.toLowerCase() ===
          search?.toLowerCase().split("%20").join(" ")
    );
    setFilData(filterData);

    if (filterData?.length === 0) {
      setErr(true);
    }
    //   console.log(filterData?.length);
  }, [data]);

  // console.log(filData);
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4 mb-48">
        {isLoading && <Skeleton />}
        {filData?.length === 0 && (
          <div>
            <h1 className="font-semibold">
              No result for {search?.split("%20").join(" ")}
            </h1>
          </div>
        )}
        {filData?.map((item) => {
          return (
            <div
              className="bg-gray-50 border border-gray-200 rounded p-6"
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
                    <Link href={`/admin/show/${item._id}`}>
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
      </div>
      {/* )} */}
    </>
  );
};

export default SearchJobs;
