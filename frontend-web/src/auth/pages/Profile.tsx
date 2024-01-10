import { useUser } from "../../hooks/useUser";
import EyeLogo from "../../assets/Eye-white.svg";
import ProfileNav from "../components/profileNav";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const token = localStorage.getItem("auth-token");
  const { user, isLoading } = useUser(token);

  return (
    <UserContext.Provider value={{user, isLoading}}>
      <div className="max-w-lg">
        <section className="border-x">
          <img
            src={user?.avatarUrl == "" ? EyeLogo : user?.avatarUrl}
            alt="Eye"
            className="min-w-40 max-w-45 max-h-45"
          />
          <div className="bg-white-paper p-5">
            <div className="">
              <ProfileNav />
            </div>
          </div>
        </section>
      </div>
    </UserContext.Provider>
  );
};

export default Profile;
