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
    throw new Error(`Failed to create post: ${error.message}`);
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
    throw new Error(`Failed to edit post: ${error.message}`);
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
    throw new Error(`Failed to delete post: ${error.message}`);
  }

  revalidatePath(`/`);
  revalidatePath(path);
};
export const searchPost = async (search) => {
  try {
    connect();

/*     const res = await Job.find({
      $or: [
        { tags: { $regex: search } },
        { 'data.company': search },
        { 'data.title': search },
      ]
    });
    console.log(res) */

    // const res = await Job.find();
    // const ress = JSON.stringify(res);


    // return JSON.parse(ress);
    return await Job.find();
   
  } catch (error) {
    throw new Error(`Failed to search post: ${error.message}`);
  }
};

export const managePost = async (user) => {
  try {
    connect();

    return await Job.find({ creator: user })
    // const res = JSON.stringify(post);
    // console.log(res)
   
  } catch (error) {
    throw new Error(`Failed to find post: ${error.message}`);
  }
};
