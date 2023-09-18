"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BsTrash3Fill } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { deletePost } from "@/lib/actions/Postjob.action";
// import ManageLoading from "@/components/manage_comp/ManageLoading";
// import { AuthRequiredError } from "@/lib/exceptions";

const ManageForm = ({ creatorData }) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleDelete = async (e) => {
    console.log(e);
    const confirmed = confirm("Are you sure");

    if (!confirmed) return;
    await deletePost(e, pathname);
    router.refresh();
  };
  // console.log(!creatorData[0])
  return (
    <>
      <table className="w-full table-auto rounded-sm dark:bg-gray-900 dark:border-gray-700">
        <tbody>
          {creatorData?.map((item) => (
            <tr className="border-gray-300" key={item._id}>
              <td className="px-4 py-8 border-t border-b border-gray-300 text-lg">
                <Link href={`/show/${item._id}`}>{item.data.title}</Link>
              </td>
              <td className="px-4 py-8 border-t border-b border-gray-300 text-lg">
                <div className="flex justify-self-end">
                  <Link
                    href={`/edit/${item._id}`}
                    className="flex gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-5 py-1 sm:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <span className="text-sm sm:text-xl">
                      <TbEdit />
                    </span>
                    <p className="hidden md:block">Edit</p>
                  </Link>
                </div>
              </td>
              <td className="px-4 py-8 border-t border-b border-gray-300 text-lg">
                <div>
                  <button
                    className="flex gap-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-5 py-1 sm:py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleDelete(item._id)}
                  >
                    <span className="pt-1">
                      <BsTrash3Fill />
                    </span>
                    <p className="hidden md:block">Delete</p>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {!creatorData[0] && (
            <tr className="border-gray-300">
              <td className="px-4 py-8 border-t border-b border-gray-300 text-lg text-center">
                <h1 className="font-semibold">No job posted yet!!!</h1>
              </td>{" "}
            </tr>
          )}
        </tbody>
      </table>
      {/* } */}
    </>
  );
};

export default ManageForm;
