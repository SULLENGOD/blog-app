import { useState } from "react";
import SectionHandler from "./SectionHandler";

const ProfileNav = () => {
  const [section, setSection] = useState<string>("profile");

  return (
    <div className="m-3">
      <nav className="flex justify-around gap-2 text-2xl">
        <button
          onClick={() => setSection("profile")}
          className={
            section == "profile"
              ? "bg-black-paper text-white-paper p-1"
              : "hover:border-b hover:border-black-paper"
          }
        >
          Profile
        </button>
        <button
          onClick={() => setSection("posts")}
          className={
            section == "posts"
              ? "bg-black-paper text-white-paper p-1"
              : "hover:border-b hover:border-black-paper"
          }
        >
          Posts
        </button>
        <button
          onClick={() => setSection("settings")}
          className={
            section == "settings"
              ? "bg-black-paper text-white-paper p-1"
              : "hover:border-b hover:border-black-paper"
          }
        >
          Settings
        </button>
      </nav>
      <SectionHandler section={section} />
    </div>
  );
};

export default ProfileNav;
