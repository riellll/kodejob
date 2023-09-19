import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Postjob_Comp from "@/components/post_comp/Postjob_Comp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Job Post",
  description: "Generated by create next app",
};

const Post_Job = async () => {
  // const [image, setImage] = useState([]);
  //
  const session = await getServerSession(authOptions);
  // console.log(session.user.id);
  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <div className="mx-4 mb-36">
        <div className="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24 dark:bg-gray-800 dark:border-gray-700">
          <header className="text-center">
            <h2 className="text-2xl font-bold uppercase mb-1">
              Create a Job Post
            </h2>
            {/* <p>{image}</p> */}
            {/* <Image src={image} width={100} height={100}/> */}
            <p className="mb-4">Post a job to find a developer</p>
          </header>
          <Postjob_Comp sessionData={session.user.id} />
        </div>
      </div>
    </main>
  );
};

export default Post_Job;
