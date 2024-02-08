import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Profile} from "@/features/profile";
import {UserProvider} from "@/services/api";
import {User} from "@/services/api/gen";

export const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await UserProvider.getById(id);
        setUser(user);
      } catch (e) {
        // on 404 navigate back
        navigate("/");
      }
    };
    void fetchUser();
  }, [id]);

  if (!user) return null;

  return <Profile user={user} />;
};
