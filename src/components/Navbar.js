import '../assets/Navbar.css'

import React from 'react'

function Navbar() {
  return (
    <div className='navbar navbar__black'>
      <div className="navbar__contents">
      <img
        className='navbar__logo'
        src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
        alt='netlfix-logo'
      />

      <img
        className='navbar__avatar'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
        alt='avatar'
      />
      </div>
    </div>
  );
}

export default Navbar