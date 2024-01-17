import { FC } from "react";
import profilepic from "../../assets/profile.jpg";

export const Profile : FC = ()=>{
    return(
        <div>
            <div className="flex items-center p-12">
                <div className="px-12">
                    <img className="w-40 h-40 rounded-[100%]" src={profilepic} alt="user profile" />
                </div>
                <div>
                    <h1 className="font-bold text-3xl">Ny Hasina VAGNO</h1>
                    <p className="text-sm text-light">@hasnyvagno</p>
                    <p className="text-sm text-light">En savoir plus sur cette chaine</p>
                </div>
            </div>
            <hr />
            <div></div>
        </div>
    )
}