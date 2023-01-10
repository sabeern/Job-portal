import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../../containers/common/Header';
import EmpProfileForm from '../../containers/employee/EmpProfileForm';

function EmpProfileUpdate() {
  return (
    <>
    <Header />
    <Container >
        <Row >
            <Col md={2}></Col>
            <Col md={8}>
                <EmpProfileForm />
            </Col>
            <Col md={2}></Col>
        </Row>
    </Container>
    </>
    
  )
}

export default EmpProfileUpdate;