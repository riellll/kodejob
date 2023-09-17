"use server";

import { revalidatePath } from "next/cache";

export const postJobs = async (formData, image, creator) => {
  // const company = formData.get('company')
  // const title = formData.get('title')
  // const location = formData.get('location')
  const email = formData.get("email");
  const web_url = formData.get("website");
  const tags = formData.get("tags").toLowerCase().split(",");
  // const description = formData.get('description')
  const logo = image;
  const data = {
    comapny: formData.get("company"),
    title: formData.get("title"),
    location: formData.get("location"),
    desc: formData.get("description"),
  };

  await fetch(`${process.env.API_URL}/api/job`, {
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

  revalidatePath('/')
};
