export const getPots = async () => {
    const url = "http://localhost:3000/v1/posts";
    const res = await fetch(url);
    const data = await res.json();

    return data;
};