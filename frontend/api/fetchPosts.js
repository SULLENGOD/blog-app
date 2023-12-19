

const API_URL = process.env.API_URL || "http://localhost:3000"

export const getPosts = async() => {
    const url = `${API_URL}/v1/posts/`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
};

export const getPost = async (id) => {
    const url = `${API_URL}/v1/posts/${id}`
    const res = await fetch(url);
    const data = await res.json();

    return data;
};

export const getAuthorName = async (id) => {
    const url = `${API_URL}/v1/auth/authorname/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
};

export const createPost = async(post, auth) => {
    const url = `${API_URL}/v1/posts/new-post`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": auth
        },
        body: JSON.stringify(post)
    });

    return res;
};

export const getPostsBySearch = async (query) => {
    const url = `${API_URL}/v1/posts/search/${query}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
};