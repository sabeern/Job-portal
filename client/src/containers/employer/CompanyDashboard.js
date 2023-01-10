import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import JobCards from '../employee/JobCards';
import EmprJobCard from './EmprJobCard';

function CompanyDashboard() {
  const test = false;
  return (
    <div className='mt-3'>
        {test ? <div style={{marginTop:'200px'}}><h1>You are currently not posted any jobs</h1></div> : 
        (
          <Container>
            <Row>
              <Col md={12}>
              <EmprJobCard />
              <EmprJobCard />
              </Col>
            </Row>
          </Container>
        )
        }
    </div>
  )
}

export default CompanyDashboard;