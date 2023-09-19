"use client";
import Image from "next/image";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import { editJobs } from "@/lib/actions/Postjob.action";

const Post_Edit = ({ dataJob, dataId }) => {
  const [image, setImage] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  const [warning, setWarning] = useState("");
  const router = useRouter();

  const fileImage = async (e) => {
    // console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      setImage([]);
      setImageData([]);
      return;
    }
    setImageData(e.target.files[0]);
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
      setTimeout(() => setWarning(""), 5000);
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

    const logo = results.url ? results.url : dataJob.logo;

    await editJobs(formData, logo, dataJob._id);

    setPostSuccess(true);
    router.push("/");
  };

  // console.log(dataJob.tags);
  const tags = [...dataJob?.tags];

  return (
    <form action={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="company" className="inline-block text-lg mb-2">
          Company Name
        </label>
        <input
          type="text"
          className="border border-gray-200 rounded p-2 w-full"
          name="company"
          defaultValue={dataJob.data.comapny}
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
          defaultValue={dataJob.data.title}
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
          placeholder="Example: Remote, Makati PH, etc"
          defaultValue={dataJob.data.location}
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
          defaultValue={dataJob.email}
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
          defaultValue={dataJob.web_url}
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
          placeholder="Example: Laravel, Backend, Postgres, etc"
          defaultValue={tags}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="logo" className="inline-block text-lg mb-2">
          Company Logo
        </label>
        <input
          type="file"
          className="border border-gray-200 rounded p-2 w-full"
          name="logo"
          onChange={fileImage}
        />
        <Image
          className="w-60 h-auto mb-6"
          src={image[0] ? image : dataJob.logo}
          alt=""
          width={500}
          height={500}
          priority
        />
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
          defaultValue={dataJob.data.desc}
        ></textarea>
      </div>

      <div className="mb-6">
        <button className="bg-laravel text-white bg-indigo-600 rounded py-2 px-4 hover:bg-black dark:bg-gradient-to-r dark:from-teal-500 dark:via-teal-600 dark:to-teal-700">
          Update Job
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
            updated.
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
  );
};

export default Post_Edit;
