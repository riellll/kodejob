"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter, redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { postJobs } from "@/lib/actions/Postjob.action";
import LoadingButton from "../shared/LoadingButton";

// import Spinner from "../Spinner";

const Postjob_Comp = ({ sessionData }) => {
  const [image, setImage] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [warning, setWarning] = useState("");
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
  // console.log(sessionData);
  // if (session === 'undefined') throw new AuthRequiredError("Error to fetch Data");
  const fileImage = async (e) => {
    // console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      setImage([]);
      setImageData([]);
      return;
    }
    setImageData(e.target.files[0]);
    // console.log(e.target.files[0]);
    // setImage(e.target.files[0])
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      alert("error image", error);
    };

    // setImage(results.url);
  };

  const handleSubmit = async (formData) => {
    setPostLoading(true)
    if (
      !formData.get("email") ||
      !formData.get("website") ||
      !formData.get("tags") ||
      !formData.get("company") ||
      !formData.get("title") ||
      !formData.get("location") ||
      !formData.get("description")
    ) {
      setWarning("Please fill out all form.");
      setPostLoading(false)
      setTimeout(() => setWarning(''), 10000);
      return;
    }
    if (!image[0]) {
      setWarning("No image selected.");
      setPostLoading(false)
      setTimeout(() => setWarning(''), 10000);
      return;
    }

    formData.append("file", imageData);
    formData.append("upload_preset", "kodejob-image-upload_preset");
    formData.append("aoi_key", process.env.CLOUDINARY_API_KEY);

    const results = await fetch(
      "https://api.cloudinary.com/v1_1/dwiiuizwi/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    // console.log(results.url)
    if (!results) return;
    await postJobs(formData, results.url, sessionData.toString(), pathname);
    setPostLoading(false)
    setPostSuccess(true);
    router.push("/");
  };

  return (
    <>
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
              width={400}
              height={400}
              priority
            />
          ) : undefined}
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="inline-block text-lg mb-2">
            Job Description
          </label>
          <textarea
            className="border border-gray-200 rounded p-2 w-full"
            name="description"
            rows="10"
            placeholder="Include tasks, requirements, salary, etc"
          ></textarea>
        </div>

        <div className="mb-9">
          <button className="bg-laravel text-white bg-indigo-600 rounded py-2 px-4 hover:bg-black dark:bg-gradient-to-r dark:from-teal-500 dark:via-teal-600 dark:to-teal-700">
            {postLoading ? <LoadingButton/> : 'Create Job'}
          </button>

          <Link
            href="/"
            className="text-black ml-4 py-2.5 px-6 rounded hover:bg-black hover:text-white dark:text-white dark:hover:text-white"
          >
            Back
          </Link>
          {postSuccess && (
            <div
              className="p-4 text-sm text-center pt-4 text-green-800 rounded-lg dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Well done!</span> Your job post is
              success you will redirect to home page.
            </div>
          )}
          {warning && (
            <div
              className="text-sm text-center pt-4 text-yellow-800 rounded-lg dark:bg-gray-800 dark:text-yellow-400"
              role="alert"
            >
              <span className="font-medium">Warning! </span>
              {warning}
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Postjob_Comp;
