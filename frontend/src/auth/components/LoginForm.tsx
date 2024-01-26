import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Alert from "../../layout/Alert/Alert";
import { handleAuthentication } from "../utils/handleAuth";

const LoginForm = () => {
  const [alert, setAlert] = useState<string | null>(null);
  const navigate = useNavigate();
  const { email, password, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    handleAuthentication(user, setAlert, navigate);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          {alert && <Alert text={alert} />}
          <label htmlFor="email" className="text-base block mb-2">
            E-Mail
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="bg-white-paper block w-full focus:ring-black-paper p-2 text-base text-black-paper"
            placeholder="example@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-base block mb-2">
            Password
          </label>
          <input
            type="password"
            id="pasword"
            name="password"
            value={password}
            onChange={handleChange}
            className="bg-white-paper block w-full focus:ring-black-paper p-2 text-base text-black-paper"
            placeholder="••••••••••"
          />
          <span className="text-vs ">
            <a href="" className="text-white-paper-50 hover:text-black-paper">
              Forgot password?
            </a>
          </span>
        </div>
        <div className="flex justify-center m-2">
          <button className="text-2xl bg-black-paper text-white-paper-20 p-2 hover:bg-white-paper-50 hover:text-black-paper transition-all hover:border-black-paper">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
