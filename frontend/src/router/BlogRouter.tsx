import { Route, Routes } from "react-router-dom";
import PostsRouter from "../posts/routes/PostsRouter";
import AuthRouter from "../auth/router/AuthRouter";
import SearchRouter from "../search/router/SearchRouter";

const BlogRouter = () => {
  return (
      <Routes>
        <Route path="/*"  element={<PostsRouter />} />
        <Route path="account/*" element={<AuthRouter />} />
        <Route path="search" element={<SearchRouter />} />
      </Routes>
  );
};

export default BlogRouter;
