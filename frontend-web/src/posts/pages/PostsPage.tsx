import { usePosts } from "../../hooks/usePosts";
import PostsList from "../components/PostsList";
import { PostsContext } from "../context/PostsContext";

const PostsPage = () => {
  const { posts, isLoading } = usePosts();

  return (
    <PostsContext.Provider value={{ posts, isLoading }}>
      <section className="flex justify-center flex-col">
        <h1 className="text-white-paper text-center p-5">Recent Posts</h1>
        <PostsList />
      </section>
    </PostsContext.Provider>
  );
};

export default PostsPage;
