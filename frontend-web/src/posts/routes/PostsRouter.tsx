import { Route, Routes } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import PostsPage from "../pages/PostsPage";
import { lazy, Suspense } from "react";

const LazyPostPage = lazy(() => import("../pages/PostPage"));

const PostsRouter = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Routes>
          <Route
            path="posts/:id"
            element={
              <Suspense fallback={<div>Loading Post...</div>}>
                <LazyPostPage />
              </Suspense>
            }
          />
          <Route path="/" element={<PostsPage />} />
        </Routes>
      </div>
    </>
  );
};

export default PostsRouter;
