import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormInputbox from '../../components/FormInputbox';

function EmpProfileDetails() {
    const userDetails = useSelector((store) => store.allUsers.user);
    console.log(userDetails);
  return (
        <Col md={6} className="overflow-auto" style={{maxHeight:'80vh'}}>
                <h1 className='mt-4'>Profile Information</h1>
            <Form>
                <Row>
                    <Col md={6}>
                        <FormInputbox data={{type:"text", placeholder:"First name", label:"First Name", value:userDetails.firstName, disabled:true, class:"mb-3 mt-3"}}/>
                    </Col>
                    <Col md={6}>
                        <FormInputbox data={{type:"text", placeholder:"Last name", label:"Last Name", value:userDetails.lastName, disabled:true, class:"mb-3 mt-3"}}/>
                    </Col>
                </Row>
                <FormInputbox data={{type:"text", placeholder:"Job title", label:"Job Title", value:userDetails.jobTitle, disabled:true, class:"mb-3"}}/>
                <FormInputbox data={{type:"text", placeholder:"Qualifications", label:"Qualifications", value:userDetails.qualification, disabled:true, class:"mb-3"}}/>
                <FormInputbox data={{type:"text", placeholder:"Experience", label:"Experience", value:userDetails.experience, disabled:true, class:"mb-3"}}/>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>More Details</Form.Label>
                    <Form.Control as="textarea" rows={3} value={userDetails.jobTitle} disabled='true'/>
                </Form.Group>
                <FormInputbox data={{type:"number", placeholder:"Contact number", label:"Contact Number", value:userDetails.contactNumber, disabled:true, class:"mb-3"}}/>
                <Link to="/empProfile/updateProfile"><Button variant="primary" type="submit">
                    Update Details
                </Button></Link>
            </Form>
        </Col>
  )
}

export default EmpProfileDetails;