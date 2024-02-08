import {FC, useEffect, useState} from "react";
import {Layout} from "@/layout";
import {ProfileEdit} from "@/features/profile";
import {useParams} from "react-router-dom";
import {DEFAULT_QUERY, UserProvider} from "@/services/api";
import {User, UserPictureType} from "@/services/api/gen";

export const ProfileEditPage: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [picURL, setPicURL] = useState<string>();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const user = await UserProvider.getById(id);
        console.log("User: " + user?.first_name);
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
          ...DEFAULT_QUERY,
          params: {
            type: UserPictureType.PROFILE,
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
    <Layout>
      <div
        className="mx-[2.8rem] h-full pt-[3.8rem] md:mx-[11rem]"
        data-testid="profile_edit_layout"
      >
        {<ProfileEdit currentUser={user} profilePic={picURL} />}
      </div>
    </Layout>
  );
};
