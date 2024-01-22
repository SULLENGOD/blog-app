import { FC } from "react";
import { usePost } from "../../hooks/usePosts";
import PostLoader from "../PostLoader/PostLoader";
import { Link } from "react-router-dom";

const stockImage =
  "https://images.unsplash.com/photo-1527467779599-34448b3fa6a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Postcard: FC<{ id: string }> = ({ id }) => {
  const { post, isLoading } = usePost(id);
  return (
    <div>
      {isLoading ? (
        <PostLoader />
      ) : (
        <Link to={`/posts/${id}`}>
          <div className="p-3 flex hover:bg-black-paper-90 hover:text-white-paper">
            <img
              src={post?.featuredImage ? post?.featuredImage : stockImage}
              alt={post?.title}
              className="size-24 w-32"
            />
            <div className="m-1 flex flex-col justify-between">
              <h1>{post?.title}</h1>
              <div>
                <h5 className="text-sm text-white-paper-50 m-2">
                  {post?.author.username}
                </h5>
                <div className="flex gap-2 text-center">
                  {post?.tags.map((tag, index) => (
                    <p key={index} className="text-xs text-white-paper-50">
                      #{tag}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Postcard;
