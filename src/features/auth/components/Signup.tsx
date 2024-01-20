import {Form, FormField} from "@/components/shadcn-ui/form";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {RegisterUser, registerUser} from "../schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

export const Signup: FC = () => {
  /*
  const {register, handleSubmit} = useForm<RegisterUser>({
    defaultValues: {
      firstname: "",
      lastname: "",
      sex: "",
      bio: "",
      email: "",
      username: "",
    },
  });
  */

  const form = useForm<z.infer<typeof registerUser>>({
    resolver: zodResolver(registerUser),
    defaultValues: {
      firstname: "",
      lastname: "",
      sex: "",
      bio: "",
      email: "",
      username: "",
    },
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Form {...form}>
        <form className="space-y-6 justify-self-center">
          <h5>
            Welcome to{" "}
            <label
              htmlFor=""
              className="font-dancing-script text-3xl font-bold"
            >
              Blogify
            </label>
          </h5>
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
              Email address
            </label>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4">
              Password
            </label>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4">
              Confirm password
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4">
                First name
              </label>
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4">
                Last name
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
};
