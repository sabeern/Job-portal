import axios from 'axios';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeMenu from '../components/EmployeeMenu';
import EmployerMenu from '../components/EmployerMenu';
import { setUser } from '../redux/actions/UserAction';

function Header() {
  const allUsers = useSelector((store) => store.allUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
		localStorage.removeItem("empToken");
		navigate('/signin');
	};
  useEffect(() => {
    const token = localStorage.getItem("empToken");
    if(!token) {
      navigate('/signin');
    }
    const instance = axios.create({
			baseURL: 'http://localhost:8000',
			headers: {'X-Custom-Header': `${token}`}
		  });
      instance.get('/user').then(({data : res})=> {
      dispatch(setUser(res.user));
    }).catch((err) => {
      navigate('/signin');
    });
  },[navigate, dispatch]);
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
              { allUsers.user.userType === 'Job Seeker' ? <EmployeeMenu /> : <EmployerMenu /> }
          </Nav>
              <Link to="/empProfile" className='float-right' style={{color:'white',paddingRight:'10px'}}>{allUsers.user.userName}</Link>
              <Link to="/signin" className='float-right' onClick={handleLogout} style={{color:'white'}}>Logout</Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;

