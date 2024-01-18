import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePosts";
import PostLoader from "../../layout/PostLoader/PostLoader";
import { Post } from "../../hooks/usePosts";
import { FC } from "react";
import PostContent from "../components/PostContent";

interface PostPageProps {}

const PostPage: FC<PostPageProps> = () => {
  const { id }: { id: string } = useParams();

  const { post, isLoading }: { post: Post | null; isLoading: boolean } = usePost(id);

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
         <PostContent post={post} />
        </article>
      )}
    </div>
  );
};

export default PostPage;
