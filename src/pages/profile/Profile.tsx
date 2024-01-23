import {FC, useEffect, useState} from "react";
import profilepic from "../../assets/profile.jpg";
import {Error} from "@/common/error";
import {useParams} from "react-router-dom";
import {InlineMenu} from "@/common/inline-menu";
import {Button} from "@/components/shadcn-ui/button";

export const Profile: FC = () => {
  const [posts, setPosts] = useState<any>([]);
  const {id} = useParams();

  function increment() {
    setPosts([...posts, 1]);
  }

  useEffect(() => {
    console.log(id); //Get user by id
  });

  return (
    <div>
      <div className="flex items-center p-12">
        <div className="px-12">
          <img
            className="h-40 w-40 rounded-[100%]"
            src={profilepic}
            alt="user profile"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Ny Hasina VAGNO</h1>
          <p className="text-light text-sm">@hasnyvagno</p>
          <p className="text-light text-xs text-gray-500">
            Donne vie a tes idees
          </p>
          <p className="text-light text-sm">Find out more about this channel</p>
          <div className="flex justify-between">
            <Button className="my-2 rounded-[25px] hover:bg-gray-600">
              Customize chanel
            </Button>
            <Button className="m-2 rounded-[25px] hover:bg-gray-600">
              Manage contents
            </Button>
          </div>
        </div>
      </div>
      <InlineMenu action={increment} />
      <hr className="mx-12" />
      {posts.length == 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-start-2 row-start-10 text-center text-xs">
            <Error
              others={
                <Button className="m-3 rounded-[25px] px-4 py-2 text-sm text-white hover:bg-gray-600">
                  Create
                </Button>
              }
              message="Upload or save content wherever you are, and all your public ideas will appear here."
            >
              <svg
                className="m-auto my-2 h-6 w-6 text-red-500 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
            </Error>
          </div>
        </div>
      )}
    </div>
  );
};
