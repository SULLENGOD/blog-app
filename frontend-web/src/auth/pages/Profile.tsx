import { useUser } from "../../hooks/useUser";
import EyeLogo from "../../assets/Eye-white.svg";
import ProfileNav from "../components/ProfileNav";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const token = localStorage.getItem("auth-token") || "";
  const { user, isLoading } = useUser(token);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      <div className="max-w-lg">
        <section className="border-x flex flex-col">
          <div className="p-5 m-auto">
              <img
                src={user?.avatarUrl == "" ? EyeLogo : user?.avatarUrl}
                alt="Eye"
                className="w-full max-w-72"
              />
          </div>
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
