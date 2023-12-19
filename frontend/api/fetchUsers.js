// import {API_URL} from "@env";
const API_URL = process.env.API_URL || "http://localhost:3000"

export const  signin = async (user) => {
    const url = `${API_URL}/v1/auth/signin`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    return res;
};

export const signup = async (newUser) => {
    const url = `${API_URL}v1/auth/signup`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    });

    return res;
}