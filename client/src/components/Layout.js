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
          <div className="footer-content">
            <section className="footer-brand" aria-label="Safe Flight footer">
              <p className="eyebrow">Safe Flight</p>
              <h2>Travel with better context.</h2>
              <p>
                Country risk intelligence for travelers, families, and teams planning
                where to go next.
              </p>
            </section>

            <div className="footer-columns">
              <section className="footer-column">
                <h3>Travel Support</h3>
                <ul>
                  <li>Destination risk briefings</li>
                  <li>Pre-trip country review</li>
                  <li>Watchlist planning</li>
                </ul>
              </section>
              <section className="footer-column">
                <h3>Planning Tools</h3>
                <ul>
                  <li>Risk level comparison</li>
                  <li>Saved destinations</li>
                  <li>Email and password accounts</li>
                </ul>
              </section>
              <section className="footer-column">
                <h3>Traveler Notes</h3>
                <ul>
                  <li>United States · English</li>
                  <li>Updated for practical trip planning</li>
                  <li>Use official advisories before departure</li>
                </ul>
              </section>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Safe Flight</span>
            <span>Destination guidance for informed travel decisions.</span>
          </div>
        </footer>
      </>
    );
  };

export default Layout;
