import { useUser } from "../../hooks/useUser";
import EyeLogo from '../../assets/Eye-white.svg'
import ProfileNav from "../components/profileNav";


const Profile = () => {
  const token = localStorage.getItem('auth-token');
  const {user, isLoading} = useUser(token);

  console.log(user, isLoading);
  
  
  return (
    <div className="max-w-lg">
      <section className="border-x">
        <img src={user?.avatarUrl == '' ? EyeLogo : user?.avatarUrl} alt="Eye" className="min-w-40 max-w-45" />
        <div className="bg-white-paper p-5">
          <h1>{user?.username}</h1>
          <div>
            <ProfileNav />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile