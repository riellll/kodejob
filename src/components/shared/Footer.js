'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = () => {
  const router = useRouter()
  return (
    <footer
    className="fixed bottom-0 left-0 w-full flex items-center justify-start font-bold bg-laravel text-white h-20 mt-24 opacity-90 md:justify-center bg-indigo-600 dark:bg-gradient-to-r dark:from-teal-500 dark:via-teal-600 dark:to-teal-700"
  >
    <p className="ml-2">Copyright &copy; 2023, All Rights reserved</p>

    <button
      onClick={() => router.push('/post-job')}
      className="absolute top-1/3 right-10 bg-black text-white py-2 px-5"
      >Post Job</button>
  </footer>

  )
}

export default Footer