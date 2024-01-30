import {FC} from "react";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Badge} from "@/components/shadcn-ui/badge";
import {Layout, AnonymousHeader} from "@/layout";
import blankUserProfile from "@/assets/noun-user-picture.svg";
import {CustomCard} from "@/features/home/components/Card";

import mockimage1 from "@/assets/mockImages/pic1.png";
import mockimage2 from "@/assets/mockImages/pic2.png";
import mockimage3 from "@/assets/mockImages/pic3.png";
import mockimage4 from "@/assets/mockImages/pic4.png";
import mockimage5 from "@/assets/mockImages/pic5.png";
import mockimage6 from "@/assets/mockImages/pic6.png";

export interface HomeProps {
    post: string;
}

export const Home: FC<HomeProps> = () => {
    return (
        <Layout header={<AnonymousHeader/>}>
            <h1 className="ml-10 mt-10 pt-18 text-xl font-semibold">Recent blog posts</h1>
            <div
                data-testid="post-title"
                className="mb-2 flex w-full justify-center p-5"
            >
                <CustomCard mockImage={mockimage1}/>
                <CustomCard mockImage={mockimage2}/>
                <CustomCard mockImage={mockimage3}/>
            </div>
            <div
                data-testid="post-title"
                className="flex w-full justify-center px-5"
            >
                <CustomCard mockImage={mockimage4}/>
                <CustomCard mockImage={mockimage5}/>
                <CustomCard mockImage={mockimage6}/>
            </div>
        </Layout>
    );
};