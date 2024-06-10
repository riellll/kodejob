'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SlGlobe } from "react-icons/sl";

const Footer = () => {
  const router = useRouter()
  return (
    <footer
    className="w-full flex items-center justify-start font-bold bg-laravel text-white opacity-90 md:justify-center bg-indigo-600 dark:bg-gradient-to-r dark:from-teal-500 dark:via-teal-600 dark:to-teal-700"
  >
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center justify-center gap-2">
        <SlGlobe className="text-5xl text-gray-200 font-extrabold"/>
        <h1 className="text-2xl bg-laravel w-fit font-extrabold leading-none tracking-tight lg:text-4xl text-gray-200">KODEJOB</h1>
        </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-300 sm:text-center">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
  </footer>

  )
}

export default Footer