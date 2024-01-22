import { useContext } from "react";
import { UserContext, UserContextData } from "../context/UserContext";
import Postcard from "../../layout/PostCard/Postcard";

const UsersPosts = () => {
  const { user } = useContext<UserContextData>(UserContext);
  return (
    <div>
      <h1>Posts: </h1>
      {user?.posts.map((post , index) => (
        <Postcard id={post} key={index}/>
      ))}
    </div>
  );
};

export default UsersPosts;
