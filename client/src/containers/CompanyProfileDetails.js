import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import FormInputbox from '../components/FormInputbox';

function CompanyProfileDetails() {
    const userDetails = useSelector((store) => store.allUsers.user);
  return (
        <Col md={4} className="overflow-auto" style={{maxHeight:'80vh'}}>
                <h1 className='mt-4'>Company Details</h1>
            <Form>
                <FormInputbox data={{type:"text", label:"Company Name", class:"mb-3", placeholder:"Your company name", value:userDetails.companyName, disabled:true}}/>
                <FormInputbox data={{type:"text", placeholder:"Your company location", label:"Company Location", class:"mb-3", value:userDetails.companyLocation, disabled:true}}/>
                <Col md={12} className="mb-3">
                <img src={`http://localhost:8000/images/${userDetails.profileImage}`} alt="Logo not available" style={{maxWidth:'100%',height:'auto'}}></img>
                </Col>
                <Button variant="primary" type="submit">
                    Update Details
                </Button>
            </Form>
        </Col>
  )
}

export default CompanyProfileDetails;