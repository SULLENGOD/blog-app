import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const AuthRouter = () => {
  const userId = localStorage.getItem("userId");

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Routes>
          {userId ? (
            <Route
              path="login"
              element={<Navigate to={`/account/${userId}`} replace />}
            />
          ) : (
            <Route path="login" element={<Login />} />
          )}
          <Route path="/:id" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
};

export default AuthRouter;
