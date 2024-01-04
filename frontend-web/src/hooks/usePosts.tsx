import { useEffect, useState } from "react";
import { getPost, getPots } from "../helpers/fetchPosts";

export interface Author {
  _id: string;
  username: string;
}

export interface Post {
  author: Author;
  _id: string;
  title: string;
  content: string;
  featuredImage: string;
  tags: string[];
  categories: string[];
  createdAt: Date;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllPosts = async () => {
    try {
      const result = await getPots();
      result.reverse();
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

export const usePost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const findPost = async () => {
    try {
      const result = await getPost(id);
      setPost(result);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findPost();
  }, []);

  return {
    post,
    isLoading
  }
}
