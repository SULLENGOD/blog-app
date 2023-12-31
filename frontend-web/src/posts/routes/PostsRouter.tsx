import { Route, Routes } from "react-router-dom"
import Navbar from "../../layout/Navbar/Navbar"
import PostPage from "../pages/PostPage"
import PostsPage from "../pages/PostsPage"

const PostsRouter = () => {
  return (
    <>
        <Navbar />
        <div className="container">
            <Routes>
                <Route path="post/:id" element={<PostPage />}/>
                <Route path="/" element={<PostsPage />} />
            </Routes>
        </div>
    </>
  )
}

export default PostsRouter