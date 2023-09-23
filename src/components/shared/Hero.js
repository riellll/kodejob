// import Image from "next/image"
// import { useSession } from "next-auth/react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import heroImage from '../../../public/no-image.png'

const Hero = async () => {
  const session = await getServerSession(authOptions);

  // console.log(session);
  return (
    <section className="relative h-72 bg-laravel bg-indigo-600 flex flex-col justify-center align-center text-center space-y-4 mb-4 bg-center dark:bg-gradient-to-r dark:from-teal-500 dark:via-teal-600 dark:to-teal-700"
    >
      {/* <div
      className="bg-auto bg-no-repeat bg-center" style={{background-image: url(`http://127.0.0.1:5500/images/acme.png`)}}>
    </div> */}
      {/* <Image src={laravel_logo} width={50} height={100} className="object-cover mix-blend-overlay h-48 w-96 absolute pl-18"/> */}

      <div className="z-10">
        <h1 className="text-6xl font-bold uppercase text-white">
          Kode<span className="text-black">Jobs</span>
        </h1>
        <p className="text-2xl text-gray-200 font-bold my-4">
          Find or post Web Developer jobs & projects
        </p>
        <div>
          {session ? (
            <h1 className="text-white font-medium">
              Wellcome {session.user.name} !!
            </h1>
          ) : (
            <Link
              href="/login"
              className="inline-block border-2 border-white text-white py-2 px-4 rounded-xl uppercase mt-2 hover:text-black hover:border-black"
            >
              Login to Post a Job
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
