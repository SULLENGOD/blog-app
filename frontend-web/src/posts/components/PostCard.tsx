import { Post } from "../../hooks/usePosts";
import PostLoader from "../../layout/PostLoader/PostLoader";

interface Porps {
  info: {
    post: Post;
    isLoading: boolean;
  };
}

const PostCard = ({ info }: Porps) => {
    const {post, isLoading} = info;

  return (
    <div className="rounded">
      {
        isLoading ? (
            <PostLoader />
        ) : (
            <h1>{post.title}</h1>
        )
      }
    </div>
  );
};

export default PostCard;
