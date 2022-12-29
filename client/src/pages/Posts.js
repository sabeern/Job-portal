import React from 'react';
import Header from '../containers/Header';
import {Row, Col, Container} from 'react-bootstrap';
import JobCards from '../containers/JobCards';
import EachPost from '../containers/EachPost';

function Posts() {
  return (
    <>
        <Header />
        <Container>
                <hr/>
            <Row>
                <Col md={4} className="overflow-auto d-none d-md-block" style={{height:'80vh'}}>
                    <JobCards />
                    <JobCards />
                    <JobCards />
                </Col>
                <Col md={8} className="overflow-auto" style={{height:'80vh'}}>
                    <EachPost />
                    <EachPost />
                    <EachPost />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Posts;