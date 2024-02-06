import { useNavigate } from "react-router-dom";

export const signout = (navigate: ReturnType<typeof useNavigate>) => {

    localStorage.removeItem('auth-token');
    localStorage.removeItem('userId');
    navigate('/account/login');
};