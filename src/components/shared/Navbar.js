import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogOutButton from "./LogOutButton";
import ToggleTheme from "../Theme/ToggleTheme";
// import { useSession } from "next-auth/react"
// import { useRouter, redirect } from "next/navigation"
// import { useContext } from "react"
// import { AuthRequiredError } from "@/lib/exceptions";





const Navbar = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session)

  return (
    <nav className="bg-white border-gray-200 dark:bg-slate-950">
      <div className="flex flex-wrap items-center justify-between pb-4">
        <div href="/" className="flex items-center">
        <h1 class="text-8xl bg-laravel bg-indigo-600 px-3 pb-1 w-fit font-bold leading-none tracking-tight lg:text-8xl text-white dark:bg-gradient-to-r dark:from-teal-500 dark:via-teal-600 dark:to-teal-700">K<span className="text-black">J</span></h1>
        </div>

        {/* {session.status === 'loading' ? <div><h1>...</h1></div> : undefined} */}
        <div className="flex flex-wrap items-center justify-between md:w-auto pr-5 text-xl" id="navbar-default">
          <div className="pr-8">
            <ToggleTheme/>
          </div>
          {!session ? (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/login"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white dark:bg-gradient-to-r dark:from-teal-500 dark:via-teal-600 dark:to-teal-700"
                >
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="font-medium flex flex-col cursor-pointer p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* <Popover session={session} /> */}
              <LogOutButton session={session}/>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
