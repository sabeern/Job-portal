import React from 'react';
import Header from '../../containers/common/Header';
import JobCards from '../../containers/employee/JobCards';
import EachJobDetails from '../../containers/employee/EachJobDetails';
import {Row, Container, Col} from 'react-bootstrap';
import SearchBox from '../../containers/employee/SearchBox';

function Home() {
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
          <hr/>
          <SearchBox />
          <Row>
            <Col md={6} className="overflow-auto" style={{height:'70vh'}}>
                <JobCards />
                <JobCards />
                <JobCards />
                <JobCards />
            </Col>
            <Col md={6}>
                <EachJobDetails/>
            </Col>
          </Row>
        </Container>
      </>
  )
}

export default Home;