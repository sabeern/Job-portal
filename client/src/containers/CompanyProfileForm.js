import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import FormInputbox from '../components/FormInputbox';

function CompanyProfileForm({ data }) {
  return (
        <Col md={4} className="overflow-auto" style={{maxHeight:'80vh'}}>
                <h1 className='mt-4'>Company Details</h1>
            <Form>
                <FormInputbox data={{type:"text", placeholder:"Company Name", label:"Company Name", class:"mb-3" , handleChange:data.handleEmployerChange, value:data.companyDetails.companyName, name:"companyName"}}/>
                <FormInputbox data={{type:"text", placeholder:"Location", label:"Company Location", class:"mb-3", handleChange:data.handleEmployerChange, value:data.companyDetails.companyLocation, name:"companyLocation"}}/>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Company Logo</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </Col>
  )
}

export default CompanyProfileForm;