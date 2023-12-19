import { useCallback, useEffect, useState } from "react"
import { getPost, getPosts, getPostsBySearch } from "../api/fetchPosts";

export const usePosts = () => {
    const [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getAllPosts = async () => {
        try{
            const result = await getPosts();
            setPosts(result);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fecthing posts: ", error);
            setIsLoading(false);
        }
    };

    const refreshPosts = useCallback(async () => {
        setIsLoading(true);
        try {
          const result = await getPosts();
          setPosts(result);
        } catch (error) {
          console.error("Error refreshing posts: ", error);
        } finally {
          setIsLoading(false);
        }
      }, []);

    useEffect(() => {
        getAllPosts();
    }, []);

    return {
        posts,
        isLoading,
        refreshPosts
    };
};

export const usePost = (id) => {
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getPostById = async () => {
        try {
            const result = await getPost(id);
            setPost(result);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fecthing post: ", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPostById();
    }, []);

    return {
        post,
        isLoading
    };
};

export const useSearchPosts = (query) => {
    const [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getSearch = async () => {
        try{
            const result = await getPostsBySearch(query);
            setPosts(result);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fecthing post: ", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSearch();
    }, [query]);

    return {
        posts,
        isLoading
    }
};