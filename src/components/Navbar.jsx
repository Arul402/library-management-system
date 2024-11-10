import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu,IoExit } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "./Css/Navbar.css";
import axios from "axios";
// import { IoClose, IoMenu,IoExit } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const [newUsersCount, setNewUsersCount] = useState(0);
  const token = sessionStorage.getItem('admin_token');
  const navigate=useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    const token = sessionStorage.getItem('admin_token');
    const username = sessionStorage.getItem('user_type'); // Assuming username is stored in sessionStorage
  
    try {
      // if (username === 'admin') { // Only log out non-admin users
        await axios.post('http://127.0.0.1:8000/api/v1/app/adminlogout/', {}, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
  
        // Clear the token from sessionStorage for non-admin users
        sessionStorage.removeItem('admin_token');
        alert("Logout Sucess !!!")
        // setAuthToken(null); // Clear token from state or parent component
        navigate('/'); // Redirect to login page
      // } else {
      //   // Admin case: Do not log out or take different action
      //   // console.log('Admin users cannot log out from this page.');
      // }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  useEffect(() => {
    const fetchNewUsersCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/get_new_users/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        });
        if (response.status === 200) {
          setNewUsersCount(response.data.data.length);  // Set the count of new users
        }
      } catch (error) {
        console.error("Error fetching new users count:", error);
      }
    };

    fetchNewUsersCount();
  }, [token,newUsersCount]);


  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
    const buttonClassName = "nav__cta";

    return (
      <ul className={listClassName}>
        <li>
          <NavLink to="/viewuser" className={linkClassName} onClick={closeMobileMenu}>
          View User
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookdetails"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Book Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/addbook"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Add Book
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/editdeletebook"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Edit/Delete Book
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookhistory"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Book History
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/adminrentalhistory"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Rental History
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/rentallist"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Rental List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/allowuser"
            className={`${linkClassName} ${buttonClassName}`}
            id="button"
            onClick={closeMobileMenu}
          >
            Allow User
            {newUsersCount > 0 && <span className="notification-badge">{newUsersCount}</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/denyuser"
            className={`${linkClassName} ${buttonClassName}`}
            id="button"
            onClick={closeMobileMenu}
          >
            Deny User
          </NavLink>
        </li>
        <li>
        <NavLink
            // to="/bookdetails"
            className={linkClassName}
            onClick={handleLogout}
          >
            <IoExit />
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/admin" className="nav__logo">
          {/* Navigation Bar */}
          Welcome Admin
        </NavLink>

        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div
            className={`nav__menu  ${isMenuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
        )}
      </nav>
    </header>
  );
};

export default Navbar;