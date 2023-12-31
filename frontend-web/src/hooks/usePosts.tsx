import { useEffect, useState } from "react";
import { getPots } from "../helpers/fetchPosts";

export interface Author {
  _id: string;
  username: string;
}

export interface Post {
  author: Author;
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  tags: string[];
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllPosts = async () => {
    try {
      const result = await getPots();
      setPosts(result);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  },[]);

  return {
    posts,
    isLoading,
  };
};
