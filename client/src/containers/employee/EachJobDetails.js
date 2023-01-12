import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsFillCreditCardFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { returnNewDate } from '../../other/DateDisplay';

function EachJobDetails() {
  const job = useSelector((store) => store.selectedJob.job);
  return (
    <Card className="overflow-auto" style={{height:'70vh'}}>
      <Card.Header as="h5" style={{fontWeight:'600'}}>{job ? job.jobTitle : ''}</Card.Header>
      <Card.Body>
        <Card.Title>{job ? job.user.companyName : ''}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{job ? job.user.companyLocation : ''}</Card.Subtitle>
        <Card.Title style={{fontWeight:'600'}}><BsFillCreditCardFill/> ₹ {job ? job.salaryRange : ''} </Card.Title>
        <Card.Subtitle className="text-muted">Skills Required</Card.Subtitle>
        <Card.Text>
        {job ? job.requiredSkills : ''}
        </Card.Text>
        <Card.Text>
        {job ? job.moreDetails : ''}
        </Card.Text>
        <Card.Link style={{textDecoration:'none'}}>Posted on {job ? returnNewDate(job.postedDate) : ''}</Card.Link><br/>
        <Button variant="primary" className='mt-3'>Apply Now</Button>
      </Card.Body>
    </Card>
  )
}

export default EachJobDetails;