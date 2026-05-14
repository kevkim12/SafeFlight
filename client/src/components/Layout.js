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
          <NavLink to='/' onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          <NavLink to='/countryRiskSearch' onClick={() => setMenuOpen(false)}>
              Risk Search
            </NavLink>
          <NavLink to='/savedPlaces' onClick={() => setMenuOpen(false)}>
          Watchlist
            </NavLink>
            <NavLink to='/about' onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
            <NavLink to='/contact' onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </div>
          <NavLink className="account-link" to='/login' id="logInButton" onClick={() => setMenuOpen(false)}>
              Account
          </NavLink>
        </nav>

        <Outlet />

        <footer className="site-footer">
          <div>
            <h2>Safe Flight</h2>
            <p>Destination risk tools for practical travel planning.</p>
          </div>
          <nav aria-label="Footer navigation">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/countryRiskSearch'>Risk Search</NavLink>
            <NavLink to='/savedPlaces'>Watchlist</NavLink>
            <NavLink to='/about'>About</NavLink>
          </nav>
        </footer>
      </>
    );
  };

export default Layout;
