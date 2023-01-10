import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormInputbox from '../../components/FormInputbox';

function EmpProfileForm() {
  return (
        <Col md={6} className="overflow-auto" style={{maxHeight:'80vh'}}>
                <h1 className='mt-4'>Profile Information</h1>
            <Form>
                <Row>
                    <Col md={6}>
                        <FormInputbox data={{type:"text", placeholder:"First name", label:"First Name", class:"mb-3 mt-3"}}/>
                    </Col>
                    <Col md={6}>
                        <FormInputbox data={{type:"text", placeholder:"Last name", label:"Last Name", class:"mb-3 mt-3"}}/>
                    </Col>
                </Row>
                <FormInputbox data={{type:"text", placeholder:"Job title", label:"Job Title", class:"mb-3"}}/>
                <FormInputbox data={{type:"text", placeholder:"Qualifications", label:"Qualifications", class:"mb-3"}}/>
                <FormInputbox data={{type:"text", placeholder:"Experience", label:"Experience", class:"mb-3"}}/>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>More Details</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <FormInputbox data={{type:"number", placeholder:"Contact number", label:"Contact Number", class:"mb-3"}}/>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </Col>
  )
}

export default EmpProfileForm;