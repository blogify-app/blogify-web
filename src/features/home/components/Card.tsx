import {FC} from "react";
import {useNavigate} from "react-router-dom";

export const CustomCard: FC = ({mockImage}) => {
    const navigate = useNavigate();

    return (
        <div className="m-6 w-120 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            {/* TODO: it'snt supposed to be like that */}
            <div className="pl-5" onClick={()=> navigate("/posts/1")}>
                <a href="">
                    <img src={mockImage} alt="Content thumbails" height="280" width="360"/>
                </a>
            </div>
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
                <div className="flex text-xs font-light text-violet-800 space-x-2">
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