import React from 'react';
import './NewHero.css';
import './Button.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import Newhero from '../components/Newhero';

import Footernew from './Footernew';
export default function LoginInitial() {

  return (
    <div><Navbar />
      <div className='LoginAs'>


        <div className='logintag'>
          <h1 >Login As</h1>
        </div>

        <div>

          <Link to='/studentLogin' className='btn-mobile'>

            <button className="buttonStudent" ><span>Student</span></button>
          </Link>


          <Link to='/login' className='btn-mobile'>

            <button class="buttonTeacher">

              <span>Teacher</span></button>
          </Link>
          <Link to='/AdminLogin' className='btn-mobile'>

            <button className="buttonAdmin" ><span>Admin</span></button>
          </Link>

        </div>

      </div>
      <div><Newhero/></div>
      <Footernew />
    </div>
  );



}