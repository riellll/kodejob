import Job from "@/model/Job";
import connect from "@/utils/db";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
  const { user } = params;
  try {
    await connect();

    const jobRec = await Job.find({ creator: user }).populate("creator");

    return new NextResponse(JSON.stringify(jobRec), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
