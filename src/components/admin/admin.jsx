import React, { useState } from 'react'
// import './admin.css'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import Bookdetails from './bookdetails'

function Admin() {
//   const [ShowMenu, setShowMenu] = useState(false);

//  const ToggleMenu = () => {
//    setShowMenu(!ShowMenu);
//  };

//   const CloseMenuOnMobile = () => {
//     if (window.innerWidth <= 1150) {
//       setShowMenu(false);
//     }
//   };


  return (
    <>
    {/* <div></div><br/> */}
    {/* <div></div><br/> */}
    <div><Navbar/></div>
    <div><Bookdetails/></div>
    
    <div>
    {/* <header className="header">
     <nav className="nav container">
       <NavLink to="/" className="nav__logo">
         Navigation Bar
       </NavLink>

       <div
         className={`"nav__menu" ${ShowMenu ? "show-menu" : ""}`}
         id="nav-menu"
       >
         <ul className="nav__list">
           <li className="nav__item">
             <NavLink to="/" className="nav__link" onClick={CloseMenuOnMobile}>
               Home
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink to="/news" className="nav__link" onClick={CloseMenuOnMobile}>
               News
             </NavLink>
           </li>
           <li className="nav__item" >
             <NavLink
               to="/about-us"
               className="nav__link"
               onClick={CloseMenuOnMobile}
             >
               About Us
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink
               to="/favorite"
               className="nav__link"
               onClick={CloseMenuOnMobile}
             >
               Favorite
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink
               to="/location"
               className="nav__link"
               onClick={CloseMenuOnMobile}
             >
               Location
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink to="/get-started" className="nav__link nav__cta">
               Get Started
             </NavLink>
           </li>
         </ul>
         <div className="nav__close" id="nav-close" onClick={ToggleMenu}>
           <IoClose />
         </div>
       </div>

       <div className="nav__toggle" id="nav-toggle" onClick={ToggleMenu}>
         <IoMenu />
       </div>
     </nav>
   </header> */}


    </div>
    <div>
    {/* <header>Admin Dashboard</header> */}
{/*     
    <h1 className='first'>Admin Dashboard</h1>
    <h2 className='imglogo'>Welcome Admin <img height={40} width={30}  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEX///8BAQEAAAB9fX34+Pjn5+fi4uKNjY2YmJjCwsKQkJAwMDD7+/vr6+stLS3b29s4ODhZWVlTU1Nvb2/Pz8/x8fGnp6cWFhawsLCDg4M+Pj5mZma3t7coKChFRUVKSkogICBz1lKlAAAD5ElEQVR4nO2bi5KqMAyGJSAXUREKeN3V93/KUwrrUajQbkM4Zya/s+OozPjP15g2CbtasVgsFovFYrFYLBaL9T9qXSZx5PtRnJTrpb20qurrBZ66XOtqaUerUigvHnhe86deiHJRS+G1NaRMdU/SmCfCxSwFsYI0lHw33i7jaXd9Unoh1T3gulvCU7bXUmpRSVf7bAFPhx6cd1Ly5YHcVXj8iOkZWI/1ijSyqrxZoTFSzRsFbcoS+p9dn5VP6SnRghk+gDCNVt8GnBSrb7oFrAGGWLSkoCYzZchJ7ThUnm5aLDpS8s0bkamrKaiGlaDxlH1pIuojqT3NgSExDikVVQmJqUiH5AMp+YhITJkmqQ5VQWJKG1GfSQGVKRtSJKYCW1IUx5fKCpT0GhCYCv5FUxzoxrrbkaLJUxs7UhsSU4nuiPdxQyba+8LUZkM+ELUVhA0povOU1dmFaPWkjqaFgwcPKk+rkykqgBOZqaowK0ZlkiLZY1qVhrUoZYW8Wp1B0/sZ5iiao/CPglx97SgmD3LCxWtU7SdiqqmuyJvX4dc4K4B0gRbx7vIeV/14+l6kE1t96pwpT2KpwcOpbRD3SKmlo0uaA4XnYXu/ecdfbuLQaHc+/PiCztHhvNQoK3w2ydc3AS8St6elkJZXVgDUL0VmVdbxZhOfypfoDmqAgq6/v/WbswtcR0GoARccqZrWJ08FURPPWhANwcyH7iKP4ncYRPA84sFDP28sxaO9SP1Fs++A6/Q1BTQLtEnCl28NwiQ6wvs16cy/xiztH4SbHJCLqE6k6kjk6V+Q3QUepLPGe6nbV6An3RUzHvbKLsT7rEYKh58PZnOV2bU23mHOtILrQzfrHwHy+YPLPNFe/JZTyyqfw1M8ETwTpABifE+lySx0PKzwg/0Cg9OcFSnp6oLtqXbj1LJCnkju0sFNLbak5HOKW0vEzpwUKtRYr/YwiWQyprDLU+PezwQpzM5QkAMKKdTuwtoxR72wwttsYvAwSAFqqBdIoDDnpOH7eN2J1BdWLXhDA4U4gLAbxky4QhrVbAujdTJaPpkUcKa3O6yEoEgBTlJPpu5zsyKFFFQ+YkhJhzjdhTsuqTuGp+yBS+qBUWyd+iMrR1Iot3nhhpS0eHb3tE0NkRiS8uDgnql2yKCkR/eT+mkwBHUlhXD8xA4plEyV45Ny7yrk+KTcTYnpEagtKfdbFVDK0HdS7tV7iB9TCBXNHfE0pUBh1A5Jv/fqRgqpTaXugEXjhHVbgD8yLLYhpTxhTZC6cQwCJdRBTSa++nOF3+ghcLvpWbLxHbVJFvhHKBaLxWKxWCwWi8Viscz0B32rLpjJ86CtAAAAAElFTkSuQmCC'  alt='logo' /></h2><br/>
    <div className='container'>
      <Link to={'/viewuser'} className='container1'>
            <h1>View User</h1>
      </Link>
      <Link to={'/bookdetails'}  className='container1'>
            <h1>Book Details</h1>
      </Link>
      <Link to={'/addbook'} className='container1'>
            <h1>Add Book</h1>
      </Link>
      <Link to={'/bookdetails'} className='container1'>
            <h1>Delete Book</h1>
      </Link>
      <Link to={'/bookdetails'} className='container1'>
            <h1>Edit Book</h1>
      </Link>
      <Link to={'/allowuser'} className='container1'>
            <h1>Allow User</h1>
      </Link>
    </div> */}
    </div>
    </>
  )
}

export default Admin