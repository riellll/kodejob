"use client";
import Link from "next/link";
import Image from "next/image";
// import useSWR from "swr";
import { BsArrowLeft } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { FaGlobe } from "react-icons/fa";

import Spinner from "../shared/Spinner";
// import { AuthRequiredError } from "@/lib/exceptions";

const ShowJobs = ({ job }) => {

  // console.log(job);
  return (
    <>
      {job ? (
        <div className="mx-4 mb-48">
          <div className="bg-gray-50 border border-gray-200 p-10 rounded dark:bg-gray-900 dark:border-gray-700">
            <div className="flex flex-col items-center text-center">
              <Image
                className="w-60 h-auto mb-6"
                src={job?.logo}
                alt=""
                width={500}
                height={500}
                priority
              />
              <h3 className="text-2xl mb-2">{job?.data.title}</h3>
              <div className="text-xl font-bold mb-4">{job?.data.comapny}</div>
              <ul className="flex">
                {job?.tags.map((tag) => (
                  <li
                    className="bg-black text-white rounded-xl px-3 py-1 mr-2"
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
                {job?.data.location}
              </div>
              <h1>Posted {new Date(job?.createdAt)?.toDateString()}</h1>
              <div className="border border-gray-200 w-full mb-6"></div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Job Description</h3>
                <div className="grid grid-cols-row text-lg space-y-6">
                  <p>{job?.data.desc}</p>

                  <Link
                    href={`mailto:${job?.email}`}
                    className="flex gap-1 justify-center bg-laravel text-white bg-indigo-600 mt-6 py-2 rounded-xl hover:opacity-80"
                  >
                    <span className="text-2xl text-center pt-0.5">
                      <AiOutlineMail />
                    </span>
                    Contact Employer
                  </Link>

                  <Link
                    href={job?.web_url}
                    target="_blank"
                    className="flex gap-1 justify-center bg-black text-white py-2 rounded-xl hover:opacity-80"
                  >
                    <span className="text-2xl text-center pt-0.5">
                    <FaGlobe />
                    </span>
                    Visit Website
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ShowJobs;
