import Job from "@/model/Job";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();

    const jobRec = await Job.find();

    return new NextResponse(JSON.stringify(jobRec), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newJob = new Job(body);
  //  console.log(newRec);
  try {
    await connect();

    await newJob.save();

    return new NextResponse(newJob, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error" + err, { status: 500 });
  }
};
