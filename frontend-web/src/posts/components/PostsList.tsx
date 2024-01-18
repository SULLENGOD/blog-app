import { FC, useContext } from "react";
import PostCard from "./PostCard";
import { PostsContext, PostsContextData } from "../context/PostsContext";
import PostLoader from "../../layout/PostLoader/PostLoader";

const PostsList: FC = () => {
  const { posts, isLoading } = useContext<PostsContextData>(PostsContext);

  return (
    <div className="">
        <h1 className="text-white-paper text-center p-3 border-b bg-[#202020]">
          Recent Posts
        </h1>
      <div className="flex flex-wrap justify-center">
        {isLoading ? (
          <div className="flex flex-wrap justify-center">
            <PostLoader />
            <PostLoader />
            <PostLoader />
          </div>
        ) : (
          posts?.map((post, index) => (
            <PostCard info={{ post, isLoading }} key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default PostsList;
