import React from 'react';
import Footer from '../components/Footer';
import '../css/contactUs.css';
import Navbar from '../components/Navbar';
 
export default function ContactUs() {
  return (
    <div>
      <Navbar/>
     <div> 
      <h3 className='contact-tag'>Need our help? Get in touch with us!</h3>
      <p className='para1'>Need any help then get in touch with our Support Team? We’re here to solve your problem!<br/>
      Feel free to reach us through our email.<br></br></p>

 
      <div>  
        <div>
          <h1 className='mobile-tag'><b>
            Call Us</b></h1>
          
        <a class="mobile" href="mailto:9208974433"> Our Team &gt;</a>
        </div>
 
      </div>
      <div>  
        <div>
          <h1 className='email-tag'><b>
            Email Us</b></h1>
         
        <a class="mail" href="mailto:onlineeducationsystem@support.com">Email Our Team &gt;</a>
        </div>
 
      </div>
      </div>
     <div className='bottomFooter'><Footer/></div>
    </div>
    
 
  );
}