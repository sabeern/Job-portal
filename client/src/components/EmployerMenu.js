import React from 'react';
import { Link } from 'react-router-dom';

function EmployerMenu() {
  return (
    <>
        <Link to="/empProfile" className='nav-link'>Dashboard</Link>
        <Link to="#action2" className='nav-link'>Post Job</Link>
        <Link to="#action2" className='nav-link'>Chats</Link>
    </>
  )
}

export default EmployerMenu;