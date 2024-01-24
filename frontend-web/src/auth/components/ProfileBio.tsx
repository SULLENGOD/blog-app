import { FormEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { updateBio } from "../../helpers/authUser";

interface BioForm {
  bio: string;
  [key: string]: string;
}

const ProfileBio = ({ userBio }: { userBio: string | undefined }) => {
  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const { bio, handleChange, handleReset } = useForm<BioForm>({
    bio: "",
  });

  const handleBio = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    setActiveEdit(false);
    handleReset();
    const token = localStorage.getItem("auth-token") || "";
    try {
      await updateBio({ bio }, token);
    } catch (e) {
      console.error(e);
    }
  };

  console.log(userBio);
  return (
    <>
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
            <form onSubmit={handleBio}>
              <textarea
                id="bio"
                name="bio"
                value={bio}
                placeholder={userBio || "Write something..."}
                onChange={handleChange}
                cols={30}
                rows={10}
                className="bg-white w-full text-xs p-3"
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="border border-black-paper hover:bg-black-paper hover:text-white-paper px-1"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p>{userBio == undefined ? "Instert Bio here..." : userBio}</p>
        )}
      </div>
    </>
  );
};

export default ProfileBio;
