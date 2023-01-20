import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../containers/common/Loader';

function Test() {
  return (
    <>
      <Link to="/empProfile" style={{ padding: '20px', textDecoration: 'none', fontSize: '20px' }}>Home</Link>
      <img src='https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=2000' alt='404' style={{ backgroundRepeat: 'no-repeat', width: '100vw', height: '90vh' }}></img>
    </>
  )
}

export default Test;