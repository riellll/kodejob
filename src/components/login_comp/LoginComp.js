"use client";
import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

const LoginComp = () => {
  //  const {data: session} = useSession();
  // const router = useRouter();

  /* if (session.status === "loading") {
    <div className="mx-4 mb-36">
      <div className="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24">
        <p>Loading...</p>
      </div>
    </div>;
  }*/

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value
    const password = e.target[1].value
    // console.log(email,Password)
    signIn("credentials", {email,password})
  };

  return (
    <>
      <main>
        <div className="mx-4 pb-48">
          <div className="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24">
            <header className="text-center">
              <h2 className="text-2xl font-bold uppercase mb-1">Log In</h2>
              <p className="mb-4">Log in to post jobs</p>
            </header>
             <div className="flex flex-col justify-center justify-items-center items-center py-4">
              <h2 className="text-center">You can login as a guest if you don&#39;t want to use your <br/>Google Account.</h2>
              <p className="pt-2 text-slate-400">Email: test@gmail.com</p>
              <p className="pr-2 text-slate-400">Password: test123456</p>
             </div>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="email" className="inline-block text-lg mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="email"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="inline-block text-lg mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="password"
                />
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  className="bg-laravel text-white rounded bg-indigo-600 py-2 px-4 hover:bg-black"
                >
                  Sign In
                </button>
              </div>

              <div className="mt-8 text-center">
                <p>--- You can login your Google Account ---</p>
              </div>
            </form>
            <div className="bg-green-400 mt-8 text-center">
              <button
                type="submit"
                className="bg-laravel text-white rounded bg-slate-500 py-2 w-full hover:bg-black"
                onClick={(e) => {
                  e.preventDefault();
                  signIn("google", { callbackUrl: "/" });
                }}
              >
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginComp;
