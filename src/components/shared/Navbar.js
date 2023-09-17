import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogOutButton from "./LogOutButton";
// import { useSession } from "next-auth/react"
// import { useRouter, redirect } from "next/navigation"
// import { useContext } from "react"
// import { AuthRequiredError } from "@/lib/exceptions";





const Navbar = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session)

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between pb-4">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            className="mr-3 bg-blue-500"
            alt="Flowbite Logo"
            width={100}
            height={150}
          />
        </Link>

        {/* {session.status === 'loading' ? <div><h1>...</h1></div> : undefined} */}
        <div className="md:block md:w-auto pr-5 text-xl" id="navbar-default">
          {!session ? (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/login"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="font-medium flex flex-col cursor-pointer p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* <Popover session={session} /> */}
              <LogOutButton userName={session.user.name}/>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
