import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { authenticate } from "../../helpers/authUser";

export const handleAuthentication = async (
  user: { email: string; password: string },
  setAlert: Dispatch<SetStateAction<string | null>>,
  navigate: ReturnType<typeof useNavigate>
) => {
  const { res, data } = await authenticate(user);

  if (!res.ok) {
    console.log(res);
    setAlert("Wrong email or password...");
  } else {
    handleToken(res.headers);
    handleUserId(data.userId);
    navigate(`../${data.userId}`);
  }
};

export const handleToken = (headers: Headers) => {
  const authToken = headers.get("auth-token") ?? "";
  localStorage.setItem("auth-token", authToken);
};

export const handleUserId = (id: string) => {
  localStorage.setItem('userId', id);
};
