import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu,IoCart,IoExit,IoSearch } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "./Css/Navbar.css";
import axios from "axios";

const UserNavbar = ({ name, handleSearch, photo, setAuthToken,cartItemCount,searchQuery, setSearchQuery, }) => {

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  // const token=sessionStorage.getItem('token')
  // const username=sessionStorage.getItem('username')
  const token = sessionStorage.getItem('user_token');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = sessionStorage.getItem('user_token');
    const username = sessionStorage.getItem('user_type'); // Assuming username is stored in sessionStorage
  
    try {
      if (username !== 'admin') { // Only log out non-admin users
        await axios.post('http://127.0.0.1:8000/api/v1/app/logout/', {}, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
  
        // Clear the token from sessionStorage for non-admin users
        sessionStorage.removeItem('user_token');
        setAuthToken(null); // Clear token from state or parent component
        alert("Logout Sucess !!!")
        navigate('/'); // Redirect to login page
      } else {
        // Admin case: Do not log out or take different action
        console.log('Admin users cannot log out from this page.');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(()=>{
    async function fetchCartItems() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/cart/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (response.status === 200) {
          console.log(response.data); // Check the response data structure
          // setCartItems(response.data.items || []); // Update this to correctly set the cart items
          
          // Calculate the total amount
          // const total = (response.data.items || []).reduce(
          //   (sum, item) => sum + item.book.price * item.quantity,
          //   0
          // );
          // setTotalAmount(total);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error.response || error);
      }
    }

    fetchCartItems();
  }, [cartItemCount])
  
  

  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
    const buttonClassName = "nav__cta";

    return (
      <ul className={listClassName}>
        <li>
          <NavLink to="/viewuser" className={linkClassName} onClick={closeMobileMenu}>
          {/* View User */}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/passchange"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Pass Change
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/rentbook"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Rent Book
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/lostbookreport"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Lost Book
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/updateprofile"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Update Profile
          </NavLink>
        </li>
        <img
        src={photo || 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg'} // Fallback image if photo is null
        alt="Profile"
        className="profile-pic"
        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
      />
      <li >
      <NavLink
            to="/cart"
            className={`${linkClassName} ${buttonClassName}`}
            id="button2"
            onClick={closeMobileMenu}
          >
            <IoCart />
            {cartItemCount > 0 && <span className="notification-badge2">{cartItemCount}</span>}
          </NavLink>
            
          </li>
          <li >
      <NavLink
            // to="/bookdetails"
            className={linkClassName}
            onClick={handleLogout}
          >
            <IoExit />
          </NavLink>
            
          </li>
        {/* <li>
          <NavLink
            to="/allowuser"
            className={`${linkClassName} ${buttonClassName}`}
            id="button"
            onClick={closeMobileMenu}
          >
            Allow User
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
        </li> */}
      </ul>
    );
  };

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/home" className="nav__logo">
          {/* Navigation Bar */}
          Welcome {name}
        </NavLink>

        <div className="nav__search">
          <input 
            type="text" 
            value={searchQuery} 
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search for a book..." 
            className="search-input"
          />
          <button className="search_btn" onClick={handleSearch}><IoSearch /></button>
        </div>

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

export default UserNavbar;