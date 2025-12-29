import React, { useState } from "react";      // Import React and the useState hook
import { Link } from "react-router-dom";      // For navigation between pages
import logo from "../../assets/logoo.png";     // Import the logo image
import "../../styles/owner/NavbarOwner.css";        // Custom CSS styling
import { useAuth } from "../../context/AuthContext";
const NavbarOwner = () => {

  const { logout } = useAuth();
  // Controls if the entire menu (on mobile) is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // Controls if the Profile dropdown is open or closed
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-md owner-navbar">   {/* Bootstrap navbar */}
      <div className="container">                            {/* Centers content */}

        {/* LOGO Section */}
        <Link to="/owner-dashboard" className="navbar-brand">
          <img src={logo} alt="logo" height="70" />          {/* Logo image */}
        </Link>

        {/* Hamburger button (mobile menu button) */}
        <button
          className="navbar-toggler"                        // Bootstrap class
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}            // Toggles mobile menu
        >
          <span className="navbar-toggler-icon"></span>     {/* Icon inside button */}
        </button>

        {/* Collapsible Menu (shows/hides on mobile) */}
        {/* If menuOpen is true → add class "show" to display menu */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>

          <ul className="navbar-nav ms-md-auto mb-2 ">  {/* Navbar items */}
          
            {/* Profile Dropdown */}
            <li
              className="nav-item dropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown open/close
            
            >
              {/* when span is clicked toggle */}
              <span className="nav-link dropdown-toggle">Profile</span>

              {/* Dropdown Menu */}
              {/* If dropdownOpen is true → add "show" to open it */}
              <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? "show" : ""}`}>

                <li>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => {
                      setDropdownOpen(false);               // Close dropdown when clicked
                      setMenuOpen(false);
                      
                    }}
                  >
                    View Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="/edit-profile"
                    className="dropdown-item"
                    onClick={() => {
                      setDropdownOpen(false);               // Close dropdown
                      setMenuOpen(false);                  // Close menu on mobile
                    }}
                  >
                    Edit Profile
                  </Link>
                </li>

                <li><hr className="dropdown-divider" /></li> {/* Line separator */}

                <li>
                  <button
                    className="dropdown-item "
                    onClick={() => {
                      logout();               // call AuthContext logout
                      setDropdownOpen(false); // close dropdown
                      setMenuOpen(false);     // close mobile menu
                    }}

                  >
                    Logout
                  </button>
                </li>

              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarOwner;  // Export component



