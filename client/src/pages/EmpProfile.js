import React, {useState} from 'react';
import Header from '../containers/Header';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EachPost from '../containers/EachPost';
import { Link } from 'react-router-dom';
import AddPostModal from '../containers/AddPostModal';
import EmpProfileForm from '../containers/EmpProfileForm';
import { useSelector } from 'react-redux';
import CompanyProfileForm from '../containers/CompanyProfileForm';
import CompanyDashboard from '../containers/CompanyDashboard';

function EmpProfile() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const users = useSelector((store) => store.allUsers);
  let employee = false;
  let employer = false;
  if(users.user.userType === 'Job Seeker') {
    employee = true;
  } else if (users.user.userType === 'Job Provider') {
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
                    <CompanyProfileForm />
                    <Col md={8} className="overflow-auto" style={{maxHeight:'80vh'}}>
                    <Link to="" className='float-end mt-3'><Button style={{background:'#14AED0'}} onClick={handleShow}>Post New Job</Button></Link>
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