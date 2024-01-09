interface BodyLogin {
    email: string;
    password: string;
}

export const authenticate = async (body: BodyLogin) => {
    const url = 'http://localhost:3000/v1/auth/signin';
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    
    return {
        res,
        data
    };
};

export const profile = async (token: string) => {
    const url = 'http://localhost:3000/v1/auth/profile';
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        }
    });
    const data = await res.json();

    return data;
}