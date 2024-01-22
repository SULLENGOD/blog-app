import { useEffect, useState } from "react"
import { profile } from "../helpers/authUser";

export interface Profile {
    email: string;
    username: string;
    bio: string;
    role: string;
    avatarUrl: string;
    drafts: string[];
    muted: boolean;
    posts: string[];
    _id: string;
}

export const useUser = (token: string) => {
    const [user, setUser] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const getUser = async () => {
        try {
            const res = await profile(token);
            setUser(res);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return {
        user,
        isLoading
    }
};