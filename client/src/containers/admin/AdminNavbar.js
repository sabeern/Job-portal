import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeAdmin } from '../../redux/actions/UserAction';

function AdminNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    dispatch(removeAdmin());
    navigate('/admin');
  };
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#" style={{ paddingRight: '80px' }}><b>Job Solutions</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/admin/dashboard" className='nav-link'>Dashboard</Link>
          </Nav>
          <Link to="/admin/dashboard" className='float-right' style={{ color: 'white', paddingRight: '10px' }}>Admin</Link>
          <Link to="/admin" className='float-right' onClick={handleLogout} style={{ color: 'white' }}>Logout</Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AdminNavbar;