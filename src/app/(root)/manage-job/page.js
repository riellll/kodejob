// import Link from "next/link";
// import useSWR from "swr";
// import { BsTrash3Fill } from "react-icons/bs";
// import { TbEdit } from "react-icons/tb";

// import { getServerSession } from "next-auth";


import ManageForm from "@/components/manage_comp/ManageForm";
import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Search from "@/components/shared/Search";
import CreatorPostjob from "@/fetchData/CreatorPostjob";
// import jobData from "@/data/Data";
// import ManageLoading from "@/app/components/ManageLoading";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

export const metadata = {
  title: "Manage Post",
  description: "Generated by create next app",
};

const Mange_Job = async () => {
  const creator = '6505c0a7dd2616289b57e7d2'
  const data = await CreatorPostjob(creator)
  // const session = await getServerSession(authOptions);
  // console.log(session);
  // if (!session) {
    // redirect("/login");


  return (
    <>
      <main className="mb-48">
        {/* <!-- Search --> */}
        <Search />

        <div className="mx-4">
          <div className="bg-gray-50 border border-gray-200 p-10 rounded">
            <header>
              <h1 className="text-3xl text-center font-bold my-6 uppercase">
                Manage Jobs
              </h1>
            </header>
            <ManageForm creatorData={data} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Mange_Job;
