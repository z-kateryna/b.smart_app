import logo from '../assets/icons/Logo-3.svg';
import "./Header.scss";

export default function Header() {
    return (
        <nav className='nav'>
            <img className='nav__logo' src={logo} alt='b.smart logo'/>
            <div className='nav__avatar'></div>
        </nav>
    )
}