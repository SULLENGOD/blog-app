import { createContext } from "react";
import { Post } from "../../hooks/usePosts";

export interface PostsContextData {
    posts: Post[] | null;
    isLoading: boolean;
  }

export const PostsContext = createContext<PostsContextData>({
    posts: null,
    isLoading: false
});