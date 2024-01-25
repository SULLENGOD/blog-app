import { createContext } from "react";
import { Profile } from "../../hooks/useUser";

export interface UserContextData {
    user: Profile | null;
    isLoading: boolean;
}

export const UserContext = createContext<UserContextData>({
    user: null,
    isLoading: false
})