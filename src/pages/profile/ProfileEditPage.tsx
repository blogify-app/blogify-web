import {FC} from "react";
import {Layout, AnonymousHeader} from "@/layout";
import {ProfileEdit} from "@/features/profile";

export const ProfileEditPage: FC = () => {
  return (
    <Layout header={<AnonymousHeader page="sign_up" />}>
      <div
        className="mx-[2.8rem] h-full pt-[3.8rem] md:mx-[11rem]"
        data-testid="profile_edit_layout"
      >
        <ProfileEdit />
      </div>
    </Layout>
  );
};
