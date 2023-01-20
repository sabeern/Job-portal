import React, { useEffect, useState } from 'react';
import Header from '../../containers/common/Header';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EachPost from '../../containers/employer/EachPost';
import { Link } from 'react-router-dom';
import AddPostModal from '../../containers/employee/AddPostModal';
import EmpProfileForm from '../../containers/employee/EmpProfileDetails';
import { useDispatch, useSelector } from 'react-redux';
import CompanyProfileDetails from '../../containers/employer/CompanyProfileDetails';
import CompanyDashboard from '../../containers/employer/CompanyDashboard';
import { setUser, fetchJobs, fetchAllJobs } from '../../redux/actions/UserAction';

function EmpProfile() {
  let userDetails = useSelector((store) => store.allUsers);
  if (!userDetails.user) {
    userDetails = { user: { userType: false } };
  }
  const employeePost = useSelector((store) => store.allPosts.posts);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const handleShow = () => setShow(true);
  let employee = false;
  let employer = false;
  useEffect(() => {
    dispatch(setUser());
    if (userDetails.user.userType === 'Job Seeker') {
      dispatch(fetchAllJobs());
    } else if (userDetails.user.userType === 'Job Provider') {
      dispatch(fetchJobs());
    }
  }, [show]);
  if (userDetails.user.userType === 'Job Seeker') {
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
            <Col md={6} className="overflow-auto d-none d-md-block" style={{ maxHeight: '80vh' }}>
              <Row><Col md={12}><Link to="" className='float-end mt-3'><Button className='btn btn-primary' style={{ borderRadius: '20px' }} onClick={handleShow}>Add New Post</Button></Link></Col></Row>
              {employeePost && employeePost.length < 1 && <h2 style={{ marginLeft: '20px', marginTop: '100px' }}>Ther is no posts available</h2>}
              {employeePost &&
                employeePost.map((post, index) => {
                  return (
                    <><EachPost data={{ post }} key={index} /><hr /></>
                  );
                })
              }
            </Col>
          </Row>}
        {
          employer &&
          <Row>
            <CompanyProfileDetails />
            <Col md={8} className="overflow-auto" style={{ maxHeight: '85vh' }}>
              <Row><Col md={12}><Link to="/postJob" className='float-end mt-3'><Button style={{ background: '#14AED0', borderRadius: '20px' }}>Post New Job</Button></Link></Col></Row>
              <CompanyDashboard />
            </Col>
          </Row>
        }
      </Container>
      <AddPostModal data={{ handleClose, show }} />
    </>
  )
}

export default EmpProfile;