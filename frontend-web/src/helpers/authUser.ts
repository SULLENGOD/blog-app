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
}