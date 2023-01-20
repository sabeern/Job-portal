import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeMenu() {
  return (
    <>
      <Link to="/empProfile" className='nav-link'>Profile Details</Link>
      <Link to="/" className='nav-link'>Find Jobs</Link>
      <Link to="/chat" target="_blank" className='nav-link'>Chats</Link>
    </>
  )
}

export default EmployeeMenu;