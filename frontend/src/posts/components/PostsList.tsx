import { FC, useContext } from "react";
import { PostsContext, PostsContextData } from "../context/PostsContext";
import PostCard from "../../layout/PostCard/PostCard";


const PostsList: FC = () => {
  const { posts } = useContext<PostsContextData>(PostsContext);

  return (
    <div className="">
        <h1 className="text-white-paper text-center p-3 border-b bg-[#202020]">
          Recent Posts
        </h1>
      <div className="flex flex-wrap justify-start">
        <ul>
        {
          posts?.map((post, index) => (
            <PostCard id={post._id} key={index} />
          ))
        }
        </ul>
      </div>
    </div>
  );
};

export default PostsList;
