import Job from "@/model/Job";
import User from "@/model/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { page } = params ?? 1;

  const itemPage = 4;
  const skip = (page - 1) * itemPage;
  try {
    await connect();

    const count = await Job.estimatedDocumentCount({}, { maxTimeMS: 5000 });

    const jobRec = await Job.find().limit(itemPage).skip(skip);

    /*    // const [count, jobRec] = await Promise.all([countPromise, jobRecPromise]); */

    const pageCount = Math.ceil(count / itemPage);

    return new NextResponse(JSON.stringify({ jobRec, count, pageCount }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error" + err, { status: 500 });
  }
};
