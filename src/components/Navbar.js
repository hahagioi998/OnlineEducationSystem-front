import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
 
 
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
 
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
 
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
          <div  className='navbar-logo'>
            <i className='fab fa-typo3' />

            Online Education System
          
          </div>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
           
          <li className='nav-item'>
 <Link to='/' className='nav-links' onClick={closeMobileMenu}>
     <i className="fa fa-home"></i>&nbsp;
     HOME
 </Link>
</li>


           <li>
              <Link to='/sign-up' className='nav-links 'onClick={closeMobileMenu}>
               
                <i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;
                LOGIN
              </Link>
            </li> 

         
          
          </ul>
          

        </div>
      </nav>
    </>
  );
}
 
export default Navbar;