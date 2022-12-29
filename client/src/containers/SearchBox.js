import React from 'react';
import {Form, Button,Col, Row} from 'react-bootstrap';

function SearchBox() {
  return (
        <Form className='mb-2'>
          <Row>
            <Col md={5}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Search by job title" />
                </Form.Group>
            </Col>
            <Col md={5}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Search by place" />
                </Form.Group>
            </Col>
            <Col md={2}>
                <Button variant="primary" style={{width:'100%'}} type="submit">
                      Search
                </Button>
            </Col>
          </Row>
        </Form>
  )
}

export default SearchBox;