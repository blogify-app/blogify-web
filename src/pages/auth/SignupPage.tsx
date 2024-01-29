import {FC} from "react";
import {Layout, AnonymousHeader} from "@/layout";
import {Signup} from "@/features/auth";

export const SignupPage: FC = () => {
  // it may also have some layout-ing but at the end, It'll always use its root from the corresponding feature
  return (
    <Layout header={<AnonymousHeader page="sign_up" />}>
      <div className="mx-[2.8rem] h-full pt-[3.8rem] md:mx-[11rem]">
        <Signup />
      </div>
    </Layout>
  );
};
