import React from 'react';
import Header from '../containers/Header';
import JobCards from '../containers/JobCards';
import EachJobDetails from '../containers/EachJobDetails';
import {Row, Container, Col} from 'react-bootstrap';
import SearchBox from '../containers/SearchBox';

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