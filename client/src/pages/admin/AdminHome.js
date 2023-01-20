import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import AdminNavbar from '../../containers/admin/AdminNavbar';
import Cards from '../../containers/admin/Cards';

function AdminHome() {
  return (
    <>
      <AdminNavbar />
      <Container>
        <Row>
          <Col md={6}>
            <Cards data={{ bgColor: 'secondary' }} />
          </Col>
          <Col md={6}>
            <Cards data={{ bgColor: 'warning' }} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Cards data={{ bgColor: 'warning' }} />
          </Col>
          <Col md={6}>
            <Cards data={{ bgColor: 'secondary' }} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AdminHome;