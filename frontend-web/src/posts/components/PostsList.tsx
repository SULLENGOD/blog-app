import { useContext } from "react"
import PostCard from "./PostCard"
import { PostsContext, PostsContextData } from "../context/PostsContext";
import PostLoader from "../../layout/PostLoader/PostLoader";

const PostsList = () => {
    const {posts, isLoading} = useContext<PostsContextData>(PostsContext);

    console.log(posts);

    
  return (
    <div className="d-flex flex-wrap justify-content-center gap-3 p-0 mt-3">
        {
            isLoading ? (
              <div>
                <PostLoader />
                <PostLoader />
                <PostLoader />
              </div>
            ) : (
              posts?.map((post, index) => (
                <PostCard info={{post, isLoading}} key={index}/>
            ))
            )
        }
    </div>
  )
}

export default PostsList