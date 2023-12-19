import { useEffect, useState } from "react"
import { getAuthorName } from "../api/fetchPosts";

export const useAuthorName = (id) => {
    const [authorName, setAuthorName] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getName = async () => {
        try{
            const result = await getAuthorName(id)
            setAuthorName(result);
            setIsLoading(false);
        } catch(error){
            console.error(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getName();
    }, []);

    return {
        authorName,
        isLoading
    }
};