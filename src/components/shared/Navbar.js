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
    <nav className="bg-white border-gray-200 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between pb-4">
        <div href="/" className="flex items-center">
          <Link href={'/'}>
        <h1 class="text-8xl bg-laravel bg-indigo-600 px-3 pb-1 w-fit font-bold leading-none tracking-tight md:text-8xl min-[320px]:text-7xl text-white dark:bg-gradient-to-r dark:from-teal-500 dark:via-teal-600 dark:to-teal-700">K<span className="text-black">J</span></h1>
          </Link>
        </div>

        {/* {session.status === 'loading' ? <div><h1>...</h1></div> : undefined} */}
        <div className="flex flex-wrap items-center justify-between md:w-auto pr-5 text-xl" id="navbar-default">
          <div className="pr-8">
            <ToggleTheme/>
          </div>
          {!session ? (
            <ul className="font-medium flex flex-col md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/login"
                  className="text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 dark:from-teal-500 dark:via-teal-600 dark:to-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                >
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="font-medium flex flex-col cursor-pointer md:p-0 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-slate-900">
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
