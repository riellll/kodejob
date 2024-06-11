"use client";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import LoadingButton from "../shared/LoadingButton";
// import { useRouter } from "next/navigation";

const LoginComp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const handleLogin = async (data) => {
    const {email, password} = data
    try {
      await signIn("credentials", {email,password})
    } catch (error) {
      console.log("Sign on Error:", error)
    }
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
              <h2 className="text-center">
                You can login as a guest if you don&#39;t want to use your{" "}
                <br />
                Google Account.
              </h2>
              <p className="pt-2 text-slate-400">Email: test@gmail.com</p>
              <p className="pr-2 text-slate-400">Password: test123456</p>
            </div>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-6">
                <label htmlFor="email" className="inline-block text-lg mb-2">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address format",
                    },
                  })}
                  type="email"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="email"
                />
                <p className="text-sm text-red-500 pt-1">
                  {errors?.email?.message}
                </p>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="inline-block text-lg mb-2">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters long",
                    },
                  })}
                  type="password"
                  className="border border-gray-200 rounded p-2 w-full"
                  name="password"
                />
                <p className="text-sm text-red-500 pt-1">
                  {errors?.password?.message}
                </p>
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  className={`w-full text-white rounded bg-indigo-600 py-2 px-4 ${!isSubmitting && "hover:bg-indigo-700"}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <LoadingButton/> : "Sign In"}
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
