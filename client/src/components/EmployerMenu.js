import React from 'react';
import { Link } from 'react-router-dom';

function EmployerMenu() {
  return (
    <>
        <Link to="/empProfile" className='nav-link'>Dashboard</Link>
        <Link to="/postJob" className='nav-link'>Post Job</Link>
        <Link to="/chat" className='nav-link'>Chats</Link>
    </>
  )
}

export default EmployerMenu;