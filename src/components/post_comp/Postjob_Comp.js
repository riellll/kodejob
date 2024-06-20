"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { editJobs, postJobs } from "@/lib/actions/Postjob.action";
import LoadingButton from "../shared/LoadingButton";
import { useForm } from "react-hook-form";


const Postjob_Comp = ({sessionData, dataJob, dataId }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    getValues,
  } = useForm();
console.log("dataJob: ", dataJob)
  const [image, setImage] = useState(dataJob?.logo || "");
  const [imageData, setImageData] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const fileImage = async (e) => {
    // console.log(e.target.files[0]);
    clearErrors("logo");
    if (!e.target.files[0]) {
      setImage("");
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
  };

  const handlePost = async (data) => {
    const { email, website, tags, company, title, location, description } = data;

  // Create a new FormData object
  const formData = new FormData();

  // Append other form fields
  formData.append("email", email);
  formData.append("website", website);
  formData.append("tags", tags);
  formData.append("company", company);
  formData.append("title", title);
  formData.append("location", location);
  formData.append("description", description);


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

    const logo = results.url ? results.url : image;
    // console.log(results.url)

    if(dataJob){
      await editJobs(formData, logo, dataJob?._id);
    }else{
      await postJobs(formData, logo, sessionData.toString(), pathname);
    }
    setPostSuccess(true);
    router.push("/");
  };

  /*   useEffect(() => {
    register("logo", {
      validate: (value) => !image[0] ? "Logo is required" : true,
    });
    console.log("JAJAJA")
  }, [handlePost,imageData]) */

  return (
    <>
      <form
        action={handleSubmit(handlePost)}
        className="grid md:grid-cols-2 gap-5 pt-10"
      >
        <div className="mb-6">
          <label
            htmlFor="company"
            className="inline-block text-base mb-2 font-semibold dark:text-gray-300"
          >
            Company Name
          </label>
          <input
            {...register("company", { required: "Company name is required" })}
            type="text"
            className="border border-gray-200 rounded p-2 w-full"
            name="company"
            defaultValue={dataJob?.data.comapny}
          />
          <p className="text-sm text-red-500 pt-1">
            {errors?.company?.message}
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="inline-block text-base mb-2 font-semibold dark:text-gray-300"
          >
            Job Title
          </label>
          <input
            {...register("title", { required: "Job Title is required" })}
            type="text"
            className="border border-gray-200 rounded p-2 w-full"
            name="title"
            defaultValue={dataJob?.data.title}
            placeholder="Example: Senior Laravel Developer"
          />
          <p className="text-sm text-red-500 pt-1">{errors?.title?.message}</p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="location"
            className="inline-block text-base mb-2 font-semibold dark:text-gray-300"
          >
            Job Location
          </label>
          <input
            {...register("location", { required: "Job Location is required" })}
            type="text"
            className="border border-gray-200 rounded p-2 w-full"
            name="location"
            defaultValue={dataJob?.data.location}
            placeholder="Example: Remote, BGC, Cebu, etc"
          />
          <p className="text-sm text-red-500 pt-1">
            {errors?.location?.message}
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="inline-block text-base mb-2 font-semibold dark:text-gray-300"
          >
            Contact Email
          </label>
          <input
            {...register("email", { 
              required: "Contact Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address format"
              }
            })}
            type="text"
            className="border border-gray-200 rounded p-2 w-full"
            name="email"
            defaultValue={dataJob?.email}
          />
          <p className="text-sm text-red-500 pt-1">{errors?.email?.message}</p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="website"
            className="inline-block text-base mb-2 font-semibold dark:text-gray-300"
          >
            Website/Application URL
          </label>
          <input
            {...register("website", { 
              required: "Please provide the website/application URL",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Invalid URL format. The URL must start with 'http://', 'https://', or 'ftp://'"
              }
            })}
            type="text"
            className="border border-gray-200 rounded p-2 w-full"
            name="website"
            defaultValue={dataJob?.web_url}
          />
          <p className="text-sm text-red-500 pt-1">
            {errors?.website?.message}
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="tags"
            className="inline-block text-base mb-2 font-semibold dark:text-gray-300"
          >
            Tags (Comma Separated)
          </label>
          <input
            {...register("tags", { required: "Tags is required" })}
            type="text"
            className="border border-gray-200 rounded p-2 w-full"
            name="tags"
            defaultValue={dataJob && [...dataJob?.tags]}
            placeholder="Example: Laravel, Backend, React, etc"
          />
          <p className="text-sm text-red-500 pt-1">{errors?.tags?.message}</p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="logo"
            className="inline-block text-base mb-2 font-semibold dark:text-gray-300"
          >
            Company Logo
          </label>
          <input
            {...register("logo", {
              validate: (value) => !image[0] ? "Logo is required" : true,
            })}
            accept="image/*"
            type="file"
            className="border border-gray-200 rounded p-2 w-full"
            name="logo"
            onChange={fileImage}
          />
          <p className="text-sm text-red-500 pt-1">{errors?.logo?.message}</p>
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
          <label
            htmlFor="description"
            className="inline-block text-base mb-2 font-semibold dark:text-gray-300"
          >
            Job Description
          </label>
          <textarea
            {...register("description", {
              required: "Job Description is required",
            })}
            className="border border-gray-200 rounded p-2 w-full"
            name="description"
            rows="10"
            defaultValue={dataJob?.data.desc}
            placeholder="Include tasks, requirements, salary, etc"
          ></textarea>
          <p className="text-sm text-red-500 pt-1">
            {errors?.description?.message}
          </p>
        </div>

        <div className="mb-9">
          <button 
          className="bg-laravel text-white bg-indigo-600 rounded py-2 w-28 hover:bg-black dark:bg-gradient-to-r dark:from-teal-500 dark:via-teal-600 dark:to-teal-700"
          disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingButton /> : `${dataJob ? "Update Job" : "Create Job"}`}
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
        </div>
      </form>
    </>
  );
};

export default Postjob_Comp;
