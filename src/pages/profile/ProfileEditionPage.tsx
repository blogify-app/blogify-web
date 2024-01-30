import {FC} from "react";
import {Layout, AnonymousHeader} from "@/layout";
import {ProfileEdition} from "@/features/profile";

export const ProfileEdtionPage: FC = () => {
  return (
    <Layout header={<AnonymousHeader page="sign_up" />}>
      <div className="mx-[2.8rem] h-full pt-[3.8rem] md:mx-[11rem]">
        <ProfileEdition />
      </div>
    </Layout>
  );
};
