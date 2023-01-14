import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../containers/common/Header';


function ApplicationDetails() {
  return (
    <>
    <Container fluid>
          <Row>
            <Col md={12}>
              <Header />
            </Col>
          </Row>
    </Container>
    <Container>
        <Row className='mt-3'>
            <Col md={1}></Col>
            <Col md={10}>
            
            </Col>
            <Col md={1}></Col>
        </Row>
    </Container>
    </>
  )
}

export default ApplicationDetails;