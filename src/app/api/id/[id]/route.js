import Job from "@/model/Job";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const jobId = await Job.findById(id);
    // revalidatePath(path)
    return new NextResponse(JSON.stringify(jobId), { status: 200 });
  } catch (error) {
    return new NextResponse("Data error" + error, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Job.findByIdAndDelete(id);

    return new NextResponse("item deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Data error" + error, { status: 500 });
  }
};

export const PUT = async (request, { params, searchParams }) => {
  const id = params.id;
  // const { path } = searchParams;
  // console.log(path)
  const body = await request.json();

  const { web_url, data, email, tags, logo } = body;
  // const a = body.medicine_name
  console.log(web_url, email);
  try {
    await connect();

    await Job.findByIdAndUpdate(id, body);

    return new NextResponse("ok", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
