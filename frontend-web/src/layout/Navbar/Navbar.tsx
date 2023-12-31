import "./Navbar.css";
import EyeLogo from "../../assets/Eye-white.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="d-flex justify-content-center align-items-center gap-1">
      <img src={EyeLogo} alt="Eye" className="eye-logo" />
      <nav className="d-flex gap-3">
        <NavLink to="/" className="text fw-lighter">Home</NavLink>
        <NavLink to="/search" className="text fw-lighter">Search</NavLink>
        <NavLink to="/profile" className="text fw-lighter">Profile</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
