import {FC} from "react";
import {Layout, AnonymousHeader} from "@/layout";
import {Login} from "@/features/auth";

export const LoginPage: FC = () => {
  // it may also have some layout-ing but at the end, It'll always use its root from the corresponding feature
  return (
    <Layout header={<AnonymousHeader page="sign_in" />}>
      <div className="mx-[2.8rem] h-full pt-[3.8rem] md:mx-[11rem]">
        <Login />
      </div>
    </Layout>
  );
};
