import React, { useState} from 'react';
import Header from '../containers/Header';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EachPost from '../containers/EachPost';
import { Link } from 'react-router-dom';
import AddPostModal from '../containers/AddPostModal';
import EmpProfileForm from '../containers/EmpProfileForm';
import { useSelector } from 'react-redux';
import CompanyProfileDetails from '../containers/CompanyProfileDetails';
import CompanyDashboard from '../containers/CompanyDashboard';

function EmpProfile() {
    let userDetails = useSelector((store)=> store.allUsers);
    if(!userDetails.user) {
      userDetails = {user:{userType:false}};
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  let employee = false;
  let employer = false;
  if(userDetails.user.userType === 'Job Seeker') {
    employee = true;
  } else if (userDetails.user.userType === 'Job Provider') {
    employer = true;
  }
  return (
      <>
        <Header />
        <Container>
            {employee && 
            <Row>
                <EmpProfileForm />
                <Col md={6} className="overflow-auto d-none d-md-block" style={{maxHeight:'80vh'}}>
                    <Link to="" className='float-end mt-3'><Button style={{background:'#14AED0'}} onClick={handleShow}>Add New Post</Button></Link>
                    <EachPost />
                    <EachPost />
                    <EachPost />
                </Col>
            </Row> }
            {
                employer && 
                <Row>
                    <CompanyProfileDetails />
                    <Col md={8} className="overflow-auto" style={{maxHeight:'80vh'}}>
                    <Link to="/postJob" className='float-end mt-3'><Button style={{background:'#14AED0'}}>Post New Job</Button></Link>
                    <CompanyDashboard />
                </Col>
                </Row>
            }
        </Container>
        <AddPostModal data={{handleClose,show}}/>
    </>
  )
}

export default EmpProfile;