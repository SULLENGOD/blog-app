import { useContext, useState } from "react";
import { UserContext, UserContextData } from "../context/UserContext";

const ProfileInfo = () => {
  const { user } = useContext<UserContextData>(UserContext);
  console.log(user?.bio);
  const [activeEdit, setActiveEdit] = useState<boolean>(false);

  return (
    <div>
      <h1 className="py-5">
        {user?.username}{" "}
        <p className="text-xs text-white-paper-50">({user?.role})</p>
      </h1>
      <div>
        <div className="flex justify-between">
          <h5 className="">Bio:</h5>
          <button
            onClick={() => setActiveEdit(true)}
            className="border border-black-paper px-1 border-b-0 hover:bg-black-paper hover:text-white-paper"
          >
            edit
          </button>
        </div>
        <div className="p-3 border-t border-black-paper">
          {activeEdit ? (
            <div>
              <form action=".">
                <textarea
                  name="bio"
                  id="bio"
                  cols={30}
                  rows={10}
                  className="bg-white w-full text-xs"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveEdit(false)}
                    className="border border-black-paper hover:bg-black-paper hover:text-white-paper px-1"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p>{user?.bio == undefined ? "Instert Bio here..." : user?.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
