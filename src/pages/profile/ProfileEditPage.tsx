import {FC, useEffect, useState} from "react";
import {Layout, AnonymousHeader} from "@/layout";
import {ProfileEdit} from "@/features/profile";
import {useParams} from "react-router-dom";
import {UserProvider} from "@/services/api";
import {User} from "@/services/api/gen";

export const ProfileEditPage: FC = () => {
  const [user, setUser] = useState<User>({});
  const [picURL, setPicURL] = useState("");
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const user = await UserProvider.getById(id);
        setUser(user);
      } catch (_e) {
        // TODO: handle error
        console.error(_e);
      }
    };

    const fetchProfilePic = async () => {
      if (!id) return;
      try {
        const profilePic = await UserProvider.getPicture(id, {
          page: 1,
          pageSize: 1,
          params: {
            type: "PROFILE",
          },
        });
        setPicURL(profilePic.url ?? "");
      } catch (_e) {
        // TODO: handle error
        console.error(_e);
      }
    };

    void fetchUser();
    void fetchProfilePic();
  }, [id]);

  if (!user) return null;

  return (
    <Layout header={<AnonymousHeader page="sign_up" />}>
      <div
        className="mx-[2.8rem] h-full pt-[3.8rem] md:mx-[11rem]"
        data-testid="profile_edit_layout"
      >
        <ProfileEdit user={user} profilePic={picURL} />
      </div>
    </Layout>
  );
};
