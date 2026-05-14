import {useState} from "react";
import {NavLink, Outlet} from "react-router-dom";
import logo from "../assets/logo.png";

  const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <>
        <nav className="site-nav">
          <NavLink className="brand-link" to='/' onClick={() => setMenuOpen(false)}>
            <img src={logo} alt='Safe Flight' />
          </NavLink>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={menuOpen ? "nav-menu nav-menu-open" : "nav-menu"}>
          <NavLink to='/CountryRiskSearch' onClick={() => setMenuOpen(false)}>
              Country Risk Search
            </NavLink>
          <NavLink to='/SavedPlaces' onClick={() => setMenuOpen(false)}>
          Saved Places
            </NavLink>
            <NavLink to='/About' onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
            <NavLink to='/Contact' onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </div>
          <NavLink className="account-link" to='/LogIn' id="logInButton" onClick={() => setMenuOpen(false)}>
              Account
          </NavLink>
        </nav>

        <Outlet />
      </>
    );
  };

export default Layout;
