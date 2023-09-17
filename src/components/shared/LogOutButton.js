"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import testImage from "../../../public/testImage.png";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const LogOutButton = ({session}) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Image
            className="w-12 h-12 rounded-full cursor-pointer"
            src={session.user.image || testImage}
            alt="user photo"
            width={300}
            height={300}
          />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>{session.user.name}</MenubarLabel>
          <MenubarItem>
            <Link
              href={`/manage-job`}
              className="block py-2 pl-3 pr-4 mt-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Manage Jobs
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <button
              type="submit"
              classNameName="block py-2 pl-3 pr-4 mt-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              onClick={() => signOut("google", { callbackUrl: "/" })}
            >
              Logout
            </button>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default LogOutButton;
// <button
//   type="submit"
//   classNameName="block py-2 pl-3 pr-4 mt-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
//   onClick={() => signOut("google", { callbackUrl: "/" })}
// >
//   Logout
// </button>
{
  /* <div className="flex items-center md:order-2">
      <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <Image className="w-10 h-10 rounded-full" src={testImage} alt="user photo" width={300} height={300}/>
      </button>
     
      <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
  </div> */
}
