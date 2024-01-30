import {FC} from "react";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Badge} from "@/components/shadcn-ui/badge";
import {Layout, AnonymousHeader} from "@/layout";
import blankUserProfile from "@/assets/noun-user-picture.svg";

export interface HomeProps {
    post: string;
}

export const Home: FC<HomeProps> = () => {
    return (
        <Layout header={<AnonymousHeader/>}>
            <div
                data-testid="post-title"
                className="mb-4 mt-40 flex w-full p-11 md:mt-20 "
                style={{border: "2px solid red"}}
            >
                <h1 className="text-2xl">Recent blog posts</h1>
            </div>
        </Layout>
    );
};