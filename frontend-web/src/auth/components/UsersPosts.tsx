import { useContext } from "react";
import { UserContext, UserContextData } from "../context/UserContext";
import PostCard from "../../layout/PostCard/PostCard";

const UsersPosts = () => {
  const { user } = useContext<UserContextData>(UserContext);
  return (
    <div>
      {user?.posts.map((post , index) => (
        <PostCard id={post} key={index}/>
      ))}
    </div>
  );
};

export default UsersPosts;
