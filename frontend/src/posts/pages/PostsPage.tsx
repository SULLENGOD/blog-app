import { FC } from "react";
import { usePosts } from "../../hooks/usePosts";
import PostsList from "../components/PostsList";
import { PostsContext } from "../context/PostsContext";

interface PostsPageProps {}

const PostsPage: FC<PostsPageProps> = () => {
  const { posts, isLoading } = usePosts();

  return (
    <PostsContext.Provider value={{ posts, isLoading }}>
      <section className="min-w-min border-x bg-white-paper-20">
          <PostsList />
      </section>
    </PostsContext.Provider>
  );
};

export default PostsPage;
