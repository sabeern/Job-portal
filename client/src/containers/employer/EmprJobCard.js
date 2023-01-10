import React from 'react';
import { Card } from 'react-bootstrap';
import { BsFillCreditCardFill } from "react-icons/bs";

function EmprJobCard({jobDetails}) {
  function returnNewDate(fullDate) {
    const date = new Date(fullDate);
      const newDate = date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear();
      return newDate;
  }
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Card.Title style={{fontWeight:'600'}}>{jobDetails.jobTitle}</Card.Title>
        <Card.Title>{jobDetails.user.companyName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{jobDetails.user.companyLocation}</Card.Subtitle>
        <Card.Title style={{fontWeight:'600'}}><BsFillCreditCardFill/> ₹ {jobDetails.salaryRange} </Card.Title>
        <Card.Subtitle className="text-muted">Skills Required</Card.Subtitle>
        <Card.Text>
            {jobDetails.requiredSkills}
        </Card.Text>
        <Card.Link style={{textDecoration:'none'}}>Posted on {returnNewDate(jobDetails.postedDate)}</Card.Link>
        <Card.Link style={{textDecoration:'none',paddingLeft:'60px'}}>Applied (10 Candidates) </Card.Link>
      </Card.Body>
    </Card>
  )
}

export default EmprJobCard;