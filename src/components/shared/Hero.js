import Link from "next/link";


const Hero = async () => {

  return (
    <div className="relative h-72 bg-laravel bg-indigo-600 flex flex-col justify-center align-center text-center space-y-4 mb-4 bg-center dark:bg-gradient-to-r dark:from-teal-500 dark:via-teal-600 dark:to-teal-700"
    >
      {/* <div
      className="bg-auto bg-no-repeat bg-center" style={{background-image: url(`http://127.0.0.1:5500/images/acme.png`)}}>
    </div> */}
     {/*  <div className="absolute text-white left-0 right-0 flex items-center justify-center px-96 z-0">
      <Image src={"/no-image.png"} width={400} height={400} alt="logo" className="object-cover"/>
      </div> */}

      <div className="z-10">
        <h1 className="text-6xl font-bold uppercase text-white">
          Kode<span className="text-black">Jobs</span>
        </h1>
        <p className="text-2xl text-gray-200 font-bold my-4">
          Find or post Web Developer jobs & projects
        </p>
        <div>
            <Link
              href="/post-job"
              className="inline-block transition duration-300 delay-100 border-2 border-gray-100 text-gray-100 py-1 px-4 rounded-xl uppercase mt-2 hover:text-black hover:border-black"
            >
              Post Job
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
