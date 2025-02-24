import logo from "../assets/icons/Logo-3.svg";
import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <Link to="/" className="nav__logo"><img className="nav__img" src={logo} alt="b.smart logo" /></Link>
        <div className="nav__avatar"></div>
      </div>
    </nav>
  );
}
