import React from 'react';
import LogoutNavbar from './LogoutNavbar';
function Profile() {
  let data = localStorage.getItem('admin');
  data = JSON.parse(data);
  return (
    <div className='products'>
      <LogoutNavbar />
      <h1>Profile</h1>
      <p>Logged as : {data.adminuserName}</p>
    </div>
  );
}

export default Profile;