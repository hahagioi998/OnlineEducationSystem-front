
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import { SidebarItem } from './SidebarItem';
import {FaUserAlt} from "react-icons/fa";

import { IconContext } from 'react-icons';
import { Button } from "reactstrap";
function LogoutNavbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
     <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbars'>
          <Link to='#' className='menus-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menus active' : 'nav-menus'}>
          <ul className='nav-menus-items' onClick={showSidebar}>
            <li className='navbarc-toggle'>
              <Link to='#' className='menus-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarItem.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </IconContext.Provider>
      <nav className='navbars'>
        <div className='navbars-container'>
         
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'navi-menu'}>
            <li className='nav-item'>
            
            </li> 
            <Link to="/Logout" className='logout-btn'><Button>LOGOUT    <FaUserAlt/></Button></Link>

          </ul>


        </div>
      </nav>
      
    </>
    
  );

}

export default LogoutNavbar;


