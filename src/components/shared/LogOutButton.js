"use client";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
        <Avatar>
        <AvatarImage asChild src={session.user.image || '/testImage.png'}>
            <img src={session.user.image || '/testImage.png'} alt='user photo' className="cursor-pointer"/>
        </AvatarImage>
        {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
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
              className="block py-2 pl-3 pr-4 mt-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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