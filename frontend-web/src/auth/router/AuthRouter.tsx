import { Route, Routes } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const AuthRouter = () => {

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/:id" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
};

export default AuthRouter;
