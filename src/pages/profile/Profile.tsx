import { FC } from "react";
import profilepic from "../../assets/profile.jpg";
import { Button } from "@/common/button";

export const Profile : FC = ()=>{
    return(
        <div className="bg-thumbnail">
            <div className="flex items-center p-12">
                <div className="px-12">
                    <img className="w-40 h-40 rounded-[100%]" src={profilepic} alt="user profile" />
                </div>
                <div>
                    <h1 className="font-bold text-3xl">Ny Hasina VAGNO</h1>
                    <p className="text-sm text-light">@hasnyvagno</p>
                    <p className="text-sm text-light">En savoir plus sur cette chaine</p>
                    <div className="flex justify-between">
                        <Button classNameAttr="text-xs bg-gray-800 hover:bg-gray-600 my-3 text-sm text-white py-2 px-4 rounded-[25px]"
                        label="Personnaliser cette chaine"
                        ></Button>
                        <Button classNameAttr="text-xs bg-gray-800 hover:bg-gray-600 m-3 text-sm text-white py-2 px-4 rounded-[25px]"
                        label="Gerer les contenus"
                        ></Button>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                
            </div>
        </div>
    )
}