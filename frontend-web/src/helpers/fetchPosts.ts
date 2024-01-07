export const getPots = async () => {
    const url = "http://localhost:3000/v1/posts";
    const res = await fetch(url);
    const data = await res.json();
    console.log(res);
    

    return data;
};

export const getPost = async (id: string) => {
    const url = `http://localhost:3000/v1/posts/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(res.body);
    
    

    return data;
};