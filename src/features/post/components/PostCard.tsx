import {FC} from "react";
import {useNavigate} from "react-router-dom";

interface PostCardProps {
  image: string;
  direction: string;
}

export const PostCard: FC<PostCardProps> = ({image, direction}) => {
  const navigate = useNavigate();

  return (
    <div className={`grid grid-${direction === "col" ? "" : "cols"}-2 gap-4`}>
      {/* TODO: it'snt supposed to be like that */}
      <div
        className="max-h-56 cursor-pointer overflow-hidden"
        onClick={() => navigate("/posts/1")}
      >
        <img
          src={image}
          alt="Content thumbails"
          className="w-full object-cover"
        />
      </div>
      <div className="bg-white">
        <p className="text-xs/8 text-purple-700">
          Ny Hasina VAGNO - <span>Jan 29, 2024</span>
        </p>
        <a href="#">
          <h5 className="mb-2 text-lg font-semibold">
            Podcast: Creating a better CX Community
          </h5>
        </a>
        <p className="mb-3 text-xs text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <div className="flex space-x-2 pb-5 pt-2 text-xs font-normal">
          <div className="rounded-[8px] bg-green-100 px-3 py-1 text-green-800">
            technology
          </div>
          <div className="rounded-[8px] bg-purple-100 px-3 py-1 text-purple-800">
            mathematics
          </div>
          <div className="rounded-[8px] bg-red-100 px-3 py-1 text-red-800">
            Frameworks
          </div>
        </div>
      </div>
    </div>
  );
};
