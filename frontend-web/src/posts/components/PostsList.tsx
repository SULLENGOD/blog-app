import { useContext } from "react"
import PostCard from "./PostCard"
import { PostsContext, PostsContextData } from "../context/PostsContext";

const PostsList = () => {
    const {posts, isLoading} = useContext<PostsContextData>(PostsContext);

    
  return (
    <div>
        {
            posts?.map((post, index) => (
                <PostCard info={{post, isLoading}} key={index}/>
            ))
        }
    </div>
  )
}

export default PostsList