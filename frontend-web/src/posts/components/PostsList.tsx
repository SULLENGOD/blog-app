import { useContext } from "react"
import PostCard from "./PostCard"
import { PostsContext, PostsContextData } from "../context/PostsContext";
import PostLoader from "../../layout/PostLoader/PostLoader";

const PostsList = () => {
    const {posts, isLoading} = useContext<PostsContextData>(PostsContext);

    console.log(posts);

    
  return (
    <div className="flex flex-wrap justify-center">
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