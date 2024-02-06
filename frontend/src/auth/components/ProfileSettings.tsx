import { useNavigate } from "react-router-dom"
import { signout } from "../utils/signout"

const ProfileSettings = () => {
    const navigate = useNavigate();
    const handleSignout = () => {
        signout(navigate)
    };
  return (
    <div>
        <div>
            <button onClick={handleSignout} className="p-2 bg-black-paper text-white-paper hover:bg-white-paper hover:text-black-paper border border-black-paper">
                Sign out
            </button>
        </div>
    </div>
  )
}

export default ProfileSettings