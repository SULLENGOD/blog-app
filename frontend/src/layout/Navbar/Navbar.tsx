import EyeLogo from "../../assets/Eye-white.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  return (
    <header className="flex justify-center gap-1 border-b border-white-line">
      <img src={EyeLogo} alt="Eye" className="eye-logo m-2 size-9"/>
      <nav className="flex gap-5">
        <NavLink to="/" className="text-white-paper text-2xl hover:text-white-paper-50 transition-all self-center">Home</NavLink>
        <NavLink to="/search" className="text-white-paper text-2xl hover:text-white-paper-50 transition-all self-center">Search</NavLink>
        <NavLink to="/account/login" className="text-white-paper text-2xl hover:text-white-paper-50 transition-all self-center">Profile</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
