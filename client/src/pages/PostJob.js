import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../containers/Header';

function PostJob() {
  return (
    <>
        <Header />
        <Container>
            <Row>
                <Col md={2}></Col>
                <Col md={8} className="mt-3" style={{border:'1px solid #C2C3C2',borderRadius:'20px'}}>
                    <h1>Post New Job</h1>
                </Col>
                <Col md={2}></Col>
            </Row>
        </Container>
    </>
  )
}

export default PostJob;