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
          <div className="m-auto">
            {isLoading ? (
              <div className="p-5">
                <h1 className="text-white-paper text-5xl p-5">loading...</h1>
              </div>
            ) : (
              <img
                src={user?.avatarUrl == "" ? EyeLogo : user?.avatarUrl}
                alt="Eye"
                className="w-full p-3"
              />
            )}
          </div>
          <div className="bg-white-paper p-5">
            <ProfileNav />
          </div>
        </section>
      </div>
    </UserContext.Provider>
  );
};

export default Profile;
