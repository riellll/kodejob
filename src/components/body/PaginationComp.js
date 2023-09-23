"use client";

import { useRouter } from "next/navigation";

const PaginationComp = ({ jobPage, page }) => {
  // const { page, setPage } = useContext(PaginationContext);
  // const { jobRec, count, pageCount } = jobPage && jobPage;
  const router = useRouter()
  // console.log(jobPage, page);

  // const [jobData, getJobData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  console.log(typeof page)
  return (
    <>
      <div className="text-center">
        <nav
          aria-label="Page navigation example"
          className="m-4 justify-self-start"
        >
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                className={
                  1 == page
                    ? "flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-400  border bg-gray-200 border-gray-300 rounded-l-lg dark:bg-gray-600 dark:border-gray-700 dark:text-gray-500"
                    : "flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
                disabled={1 == page ? true : false}
                onClick={() => router.push(`/?page=${page - 1}`)}
              >
                Previous
              </button>
            </li>
            {Array(jobPage?.pageCount)
              .fill(1)
              .map((item, index) => {
                return (
                  <li key={index}>
                    <button
                      className={
                        index + 1 == page
                          ? "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                          : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      }
                      onClick={() => router.push(`/?page=${index + 1}`)}
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              })}
            <li>
              <button
                className={
                  jobPage?.pageCount == page
                    ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-400 bg-gray-200 border border-gray-300 rounded-r-lg dark:bg-gray-600 dark:border-gray-700 dark:text-gray-500 "
                    : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
                disabled={jobPage?.pageCount == page ? true : false}
                onClick={() => router.push(`/?page=${page + 1}`)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default PaginationComp;
