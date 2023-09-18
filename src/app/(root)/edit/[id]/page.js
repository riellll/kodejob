import Post_Edit from "@/components/edit_comp/Post_Edit";
import IndividualJob from "@/fetchData/IndividualJob";




export async function generateMetadata({ params }) {
  const jobData = await IndividualJob(params.id)
  return {
    title: `Edit Post: ${jobData.data.title}`,
    description: jobData.data.desc,
  }
}

const Edit = async ({params}) => {
  const jobData = await IndividualJob(params.id)


  return (
    <>
      <main>
        <div className="mx-4 mb-36">
          <div className="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24 dark:bg-gray-800 dark:border-gray-700">
            <header className="text-center">
              <h2 className="text-2xl font-bold uppercase mb-1">Edit Jobs</h2>
              <p className="mb-4">Edit: {jobData.data.title}</p>
            </header>

            <Post_Edit dataJob={jobData} dataId={params.id}/>

          </div>
        </div>
      </main>
    </>
  );
};

export default Edit;
