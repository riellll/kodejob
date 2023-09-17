"use server";

import Job from "@/model/Job";
import connect from "@/utils/db";
import { revalidatePath, revalidateTag } from "next/cache";

export const postJobs = async (formData, image, creator, path) => {
  const email = formData.get("email");
  const web_url = formData.get("website");
  const tags = formData.get("tags").toLowerCase().split(",");
  const logo = image;
  const data = {
    comapny: formData.get("company"),
    title: formData.get("title"),
    location: formData.get("location"),
    desc: formData.get("description"),
  };

  /*   await fetch(`${process.env.API_URL}/api/job`, {
    method: "POST",
    body: JSON.stringify({
      creator,
      web_url,
      data,
      email,
      tags,
      logo,
    }),
  }); */

  try {
    connect();

    await Job.create({
      creator,
      web_url,
      data,
      email,
      tags,
      logo,
    });
  } catch (error) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/manage-job");
  // revalidateTag("post");
};
export const editJobs = async (formData, image, id) => {
  const email = formData.get("email");
  const web_url = formData.get("website");
  const tags = formData.get("tags").toLowerCase().split(",");
  const logo = image;
  const data = {
    comapny: formData.get("company"),
    title: formData.get("title"),
    location: formData.get("location"),
    desc: formData.get("description"),
  };

  const body = {
    web_url,
    data,
    email,
    tags,
    logo,
  };
  // await fetch(`${process.env.API_URL}/api/id/${id}`, {
  //   method: "PUT",
  //   body: JSON.stringify({
  //     web_url,
  //     data,
  //     email,
  //     tags,
  //     logo,
  //   }),
  // });

  try {
    connect();

    await Job.findByIdAndUpdate(id, body);
  } catch (error) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath(`/edit/${id}`);
};
export const deletePost = async (id, path) => {
  // await fetch(`${process.env.API_URL}/api/id/${id}`, {
  //   method: "DELETE",
  // });
  try {
    connect();

    await Job.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }

  revalidatePath(`/`);
  revalidatePath(path);
};
export const searchPost = async () => {
  try {
    connect();

    const post = await Job.find();
    return JSON.stringify(post);
  } catch (error) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
};
