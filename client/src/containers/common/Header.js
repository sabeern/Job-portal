import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeMenu from '../../components/EmployeeMenu';
import EmployerMenu from '../../components/EmployerMenu';
import { fetchAllJobs, removeJobs, removePosts, removeUser, setEmployeePosts, setUser } from '../../redux/actions/UserAction';

function Header() {
  let allUsers = useSelector((store) => store.allUsers);
  if (!allUsers.user) {
    allUsers = { user: { userType: false } };
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("empToken");
    dispatch(removeUser());
    dispatch(removeJobs());
    dispatch(removePosts());
    navigate('/signin');
  };
  useEffect(() => {
    const token = localStorage.getItem("empToken");
    if (!token) {
      navigate('/signin');
    }
    dispatch(fetchAllJobs());
    dispatch(setEmployeePosts())
  }, []);
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
            {allUsers.user.userType === 'Job Seeker' ? <EmployeeMenu /> : <EmployerMenu />}
          </Nav>
          {allUsers.user.userType === 'Job Seeker' ?
            <Link to="/empProfile" className='float-right' style={{ color: 'white', paddingRight: '10px' }}>
              {allUsers.user.firstName ? allUsers.user.firstName + " " + allUsers.user.lastName : allUsers.user.userType}
            </Link> :
            <Link to="/empProfile" className='float-right' style={{ color: 'white', paddingRight: '10px' }}>
              {allUsers.user.companyName ? allUsers.user.companyName : allUsers.user.userType}
            </Link>
          }
          <Link to="/signin" className='float-right' onClick={handleLogout} style={{ color: 'white' }}>Logout</Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;

