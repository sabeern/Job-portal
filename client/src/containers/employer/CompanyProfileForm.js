import React from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import FormInputbox from '../../components/FormInputbox';

function CompanyProfileForm({ data }) {
  return (
        <Col md={12} className="overflow-auto" style={{maxHeight:'80vh'}}>
                <h1 className='mt-4'>Company Details</h1>
                {data.err && <Alert variant='danger' className='mb-4 w-100'>
                    {data.err}
                </Alert>}
            <Form onSubmit={data.HandleSubmit} encType="multipart/form-data">
                <FormInputbox data={{type:"text", placeholder:"Company Name", label:"Company Name", class:"mb-3" , handleChange:data.handleEmployerChange, value:data.companyDetails.companyName, name:"companyName"}}/>
                <FormInputbox data={{type:"text", placeholder:"Location", label:"Company Location", class:"mb-3", handleChange:data.handleEmployerChange, value:data.companyDetails.companyLocation, name:"companyLocation"}}/>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Company Logo</Form.Label>
                    <Form.Control type="file" onChange={data.handlePhoto}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </Col>
  )
}

export default CompanyProfileForm;