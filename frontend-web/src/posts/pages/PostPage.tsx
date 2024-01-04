import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePosts";
import PostLoader from "../../layout/PostLoader/PostLoader";

const PostPage = () => {
  const { id } = useParams();

  const { post, isLoading } = usePost(id);

  return (
    <div className="max-w-lg">
      {isLoading ? (
        <PostLoader />
      ) : (
        <article>
          <img
            src={post?.featuredImage}
            alt="Image"
            className=" border-b-white-paper border-x"
          />
          <div className="p-3 border-x">
            <h1 className="text-center text-white-paper text-2xl">
              {post?.title}
            </h1>
            <h2 className="text-white-paper-50/[.5] text-sm text-right p-1">
              Writed by: {post?.author.username}
            </h2>
          </div>
          <div className="bg-white-paper-20">
            <p className="text-black-paper p-5 text-wrap">{post?.content}</p>
          </div>
          <div className="bg-white-paper-50 p-5">
            <div className="flex gap-2">
              {post?.tags.map((tag, index) => (
                <p key={index} className="text-black-paper">
                  #{tag}
                </p>
              ))}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default PostPage;
