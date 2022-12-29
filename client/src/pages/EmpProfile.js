import React, {useState} from 'react';
import Header from '../containers/Header';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EachPost from '../containers/EachPost';
import { Link } from 'react-router-dom';
import AddPostModal from '../containers/AddPostModal';
import EmpProfileForm from '../containers/EmpProfileForm';

function EmpProfile() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
      <>
        <Header />
        <Container>
            <Row>
                <EmpProfileForm />
                <Col md={6} className="overflow-auto d-none d-md-block" style={{maxHeight:'80vh'}}>
                    <Link to="" className='float-end mt-3'><Button style={{background:'#14AED0'}} onClick={handleShow}>Add New Post</Button></Link>
                    <EachPost />
                    <EachPost />
                    <EachPost />
                </Col>
            </Row>
        </Container>
        <AddPostModal data={{handleClose,show}}/>
    </>
  )
}

export default EmpProfile;