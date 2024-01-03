import "./Navbar.css";
import EyeLogo from "../../assets/Eye-white.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-center gap-1 border-b border-white-line">
      <img src={EyeLogo} alt="Eye" className="eye-logo" />
      <nav className="flex gap-3">
        <NavLink to="/" className="text-white-paper hover:text-white-paper-50 transition-all self-center">Home</NavLink>
        <NavLink to="/search" className="text-white-paper hover:text-white-paper-50 transition-all self-center">Search</NavLink>
        <NavLink to="/profile" className="text-white-paper hover:text-white-paper-50 transition-all self-center">Profile</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
