"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter, redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { postJobs } from "@/actions/Postjob.action";

// import Spinner from "../Spinner";

const Postjob_Comp = ({ sessionData }) => {
  const [image, setImage] = useState([]);
  const pathname = usePathname();
  const router = useRouter();
  /*  const session = useSession();
    console.log(session); */
  // console.log(creator?.user.id);

  /*    const {data: session} = useSession({
      required: true,
      onUnauthenticated() {
        redirect('/login')
      }
    }); */
  // console.log(pathname);
  // if (session === 'undefined') throw new AuthRequiredError("Error to fetch Data");
  const fileImage = async (e) => {
    // console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      setImage([]);
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      alert("error image", error);
    };
  };

  const handleSubmit = async (formData) => {
    await postJobs(formData, image, sessionData, pathname);
    alert("Job is posted");
    router.push("/");
    /*   try {
          await fetch(`/api/job`, {
            method: "POST",
            body: JSON.stringify({
              creator,
              web_url,
              data,
              email,
              tags,
              logo,
            }),
          });
          alert("Job is posted");
          router.push("/");
          e.target.reset();
        } catch (err) {
          console.log(err);
        } */
  };

  return (
    <>
      <main>
        <div className="mx-4 mb-36">
          <div className="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24">
            <header className="text-center">
              <h2 className="text-2xl font-bold uppercase mb-1">
                Create a Job Post
              </h2>
              {/* <p>{image}</p> */}
              {/* <Image src={image} width={100} height={100}/> */}
              <p className="mb-4">Post a job to find a developer</p>
            </header>

            <form action={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="company" className="inline-block text-lg mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="company"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="title" className="inline-block text-lg mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="title"
                  placeholder="Example: Senior Laravel Developer"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="location" className="inline-block text-lg mb-2">
                  Job Location
                </label>
                <input
                  type="text"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="location"
                  placeholder="Example: Remote, BGC, Cebu, etc"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="inline-block text-lg mb-2">
                  Contact Email
                </label>
                <input
                  type="text"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="email"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="website" className="inline-block text-lg mb-2">
                  Website/Application URL
                </label>
                <input
                  type="text"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="website"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="tags" className="inline-block text-lg mb-2">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="tags"
                  placeholder="Example: Laravel, Backend, React, etc"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="logo" className="inline-block text-lg mb-2">
                  Company Logo
                </label>
                <input
                  accept="image/*"
                  type="file"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="logo"
                  onChange={fileImage}
                />
                {image[0] ? (
                  <Image
                    className="w-60 h-auto mb-6"
                    src={image}
                    alt=""
                    width={100}
                    height={100}
                    priority
                  />
                ) : undefined}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="inline-block text-lg mb-2"
                >
                  Job Description
                </label>
                <textarea
                  className="border border-gray-200 rounded p-2 w-full"
                  name="description"
                  rows="10"
                  placeholder="Include tasks, requirements, salary, etc"
                ></textarea>
              </div>

              <div className="mb-6">
                <button className="bg-laravel text-white bg-indigo-600 rounded py-2 px-4 hover:bg-black">
                  Create Job
                </button>

                <Link
                  href="/"
                  className="text-black ml-4 py-2.5 px-6 rounded hover:bg-black hover:text-white"
                >
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Postjob_Comp;
