import { Form, Button, Alert } from 'react-bootstrap';
import FormInputbox from '../../components/FormInputbox';
import React from 'react';

function PostJobForm({ data }) {
    return (
        <>
            <h1 className='mb-3 mt-3'>Post New Job</h1>
            {data.jobErr && <Alert variant='danger'>
                {data.jobErr}
            </Alert>}
            <FormInputbox className="mt-3" data={{ type: "text", placeholder: "Job title", label: `Job Title`, class: "mb-3", handleChange: data.handleChange, value: data.jobDetails.jobTitle, name: 'jobTitle' }}></FormInputbox>
            <FormInputbox className="mt-3" data={{ type: "text", placeholder: "Example : 30000 - 40000", label: "Salary Range(Monthly)", class: "mb-3", handleChange: data.handleChange, value: data.jobDetails.salaryRange, name: 'salaryRange' }}></FormInputbox>
            <Form.Group className="mb-3" controlId="TextareaSkills">
                <Form.Label>Skills Required</Form.Label>
                <Form.Control as="textarea" name="requiredSkills" value={data.requiredSkills} onChange={data.handleChange} rows={2} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="TextareaDetails">
                <Form.Label>More Details</Form.Label>
                <Form.Control as="textarea" name="moreDetails" value={data.moreDetails} onChange={data.handleChange} rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit" className='mb-4' onClick={data.submitJob}>
                Post Job
            </Button>
        </>
    )
}

export default PostJobForm;