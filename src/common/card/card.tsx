import {FC} from "react";
import mockimage from "@/assets/daisy_fields.jpg";

export const CustomCard: FC = () => {
  return (
    <div className="m-6 w-80 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <a href="#">
        <img src={mockimage} alt="Content thumbails" />
      </a>
      <div className="p-5">
        <p className="text-xs text-red-800">
          Ny Hasina VAGNO - <span>Jan 29, 2024</span>
        </p>
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology
          </h5>
        </a>
        <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <div className="flex justify-between text-xs font-light text-violet-800">
          <div className="rounded-[8px] bg-purple-100 px-3 py-1">
            technology
          </div>
          <div className="rounded-[8px] bg-purple-100 px-3 py-1">
            mathematics
          </div>
          <div className="rounded-[8px] bg-purple-100 px-3 py-1">
            mathematics
          </div>
        </div>
      </div>
    </div>
  );
};
