'use client'

import { useRouter } from "next/navigation"




const Search = () => {
    const router = useRouter()

     const searchJobs = (e) => {
        e.preventDefault()
        if(!e.target[0].value) return
    console.log(e.target[0].value);
    router.push(`/search/${e.target[0].value}`)
  }
  return (
    <form onSubmit={searchJobs}>
        <div className="relative border-gray-100 m-4 rounded-lg">
          <div className="absolute top-4 left-3">
            <p className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></p>
          </div>
          <input
            type="text"
            name="search"
            className="h-14 w-full pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none text-gray-900 border border-gray-400 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search Web Developer jobs..."
          />
          <div className="absolute top-2 right-2">
            <button
              type="submit"
              className="h-10 w-20 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br dark:from-teal-500 dark:via-teal-600 dark:to-teal-700"
            >
              Search
            </button>
          </div>
        </div>
      </form>
  )
}

export default Search