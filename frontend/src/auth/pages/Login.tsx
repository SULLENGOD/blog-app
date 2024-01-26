import { FC } from "react";
import EyeLogo from "../../assets/Eye-white.svg";
import LoginForm from "../components/LoginForm";



const Login: FC = () => {

  return (
    <div className="min-w-96">
      <section className="flex flex-col justify-center">
        <div className="border-x p-5">
          <span>
            <img src={EyeLogo} alt="Logo" className="min-w-fit" />
          </span>
        </div>
        <div className="bg-white-paper-20 p-5">
          <LoginForm />
          <div className="border-black-paper border-t p-2 text-center">
            <span className="text-xs text-white-paper-50">
              Don't have account?{" "}
              <a href="" className="text-black-paper hover:text-black-paper-50">
                Create an account!
              </a>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
