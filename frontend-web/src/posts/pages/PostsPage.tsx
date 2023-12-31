import { usePosts } from "../../hooks/usePosts";
import PostsList from "../components/PostsList";
import { PostsContext } from "../context/PostsContext";

const PostsPage = () => {
  const { posts, isLoading } = usePosts();

  return (
    <PostsContext.Provider value={{ posts, isLoading }}>
      <section>
        <PostsList />
      </section>
    </PostsContext.Provider>
  );
};

export default PostsPage;
