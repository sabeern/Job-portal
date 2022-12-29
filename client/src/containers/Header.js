import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#" style={{paddingRight:'80px'}}><b>Job Solutions</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
             <Link to="/" className='nav-link'>Find Jobs</Link>
            <Nav.Link href="#action2">View Posts</Nav.Link>
          </Nav>
          <Link to="/signin" className='float-right' style={{color:'white'}}>Login</Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;

