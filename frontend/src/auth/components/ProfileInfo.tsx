import { useContext } from "react";
import { UserContext, UserContextData } from "../context/UserContext";
import ProfileBio from "./ProfileBio";

const ProfileInfo = () => {
  const { user } = useContext<UserContextData>(UserContext);
  

  return (
    <div>
      <h1 className="py-5 text-2xl">
        {user?.username}
        <p className="text-xs text-white-paper-50 py-1">({user?.role})</p>
      </h1>
      <div>
       <ProfileBio userBio={user?.bio} />
      </div>
    </div>
  );
};

export default ProfileInfo;
