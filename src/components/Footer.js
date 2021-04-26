import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>

      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <Link to='/contactUs'><h2>Contact Us</h2></Link>

          </div>

        </div>
        <div className='footer-link-wrapper'>

        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
          </div>
          <small className='website-rights'>ALL RIGHTS RESERVED TO ONLINE EDUCATION TEAM © 2021</small>
          <div className='social-icons'>

            <a href='https://www.facebook.com' className='social-icon-link facebook' target='_blank'><i className='fab fa-facebook-f' /></a>

            <a href='https://www.instagram.com' className='social-icon-link instagram' target='_blank'><i className='fab fa-instagram' /></a>

            <a href='https://www.youtube.com/channel/UCabBE_lTJk35-2_l7raGkkA' className='social-icon-link youtube' target='_blank'><i className='fab fa-youtube' /></a>

            <a href='https://www.twitter.com' className='social-icon-link twitter' target='_blank'><i className='fab fa-twitter' /></a>

            <a href='https://in.linkedin.com/' className='social-icon-link twitter' target='_blank'><i className='fab fa-linkedin' /></a>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;


