import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "reactstrap";
import '../Navbar.css';

function LogoutNavbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);


  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div className='navbar-logo'>
            <i class='fab fa-typo3' />
             ADs Management
          </div>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <Link to="/Logout" className='logout-btn'><Button>LOGOUT</Button></Link>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default LogoutNavbar;
