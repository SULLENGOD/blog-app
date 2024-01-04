import EyeLogo from "../../assets/Eye-white.svg";

const Login = () => {
  return (
    <div className="max-w-lg">
      <section className="flex flex-col justify-center">
        <div className="border-x p-5">
          <span>
            <img src={EyeLogo} alt="Logo" className="min-w-40 max-w-45" />
          </span>
        </div>
        <div className="bg-white-paper-20 p-5">
          <form action=".">
            <div className="mb-2">
              <label htmlFor="email" className="text-xs block mb-2">
                E-Mail
              </label>
              <input
                type="text"
                id="email"
                className="bg-white-paper block w-full focus:ring-black-paper p-1 text-xs text-black-paper"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs block mb-2">
                Password
              </label>
              <input
                type="password"
                id="pasword"
                className="bg-white-paper block w-full focus:ring-black-paper p-1 text-xs text-black-paper"
                placeholder="••••••••••"
              />
              <span className="text-vs ">
                <a
                  href=""
                  className="text-white-paper-50 hover:text-black-paper"
                >
                  Forgot password?
                </a>
              </span>
            </div>
            <div className="flex justify-center m-2">
              <button className="bg-black-paper text-white-paper-20 p-2 hover:bg-white-paper-50 hover:text-black-paper transition-all hover:border-black-paper">
                LOGIN
              </button>
            </div>
          </form>
          <div className="border-black-paper border-t p-2">
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
