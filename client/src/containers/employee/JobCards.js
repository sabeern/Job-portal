import React from 'react';
import { Card } from 'react-bootstrap';
import { BsFillCreditCardFill } from "react-icons/bs";

function JobCards({data}) {
  function returnNewDate(fullDate) {
    const date = new Date(fullDate);
      const newDate = date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear();
      return newDate;
  }
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Card.Title style={{fontWeight:'600'}}>{data.jobTitle}</Card.Title>
        <Card.Title>{data.user.companyName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{data.user.companyLocation}</Card.Subtitle>
        <Card.Title style={{fontWeight:'600'}}><BsFillCreditCardFill/> ₹ {data.salaryRange} </Card.Title>
        <Card.Subtitle className="text-muted">Skills Required</Card.Subtitle>
        <Card.Text>
        {data.requiredSkills}
        </Card.Text>
        <Card.Link style={{textDecoration:'none'}}>Posted on {returnNewDate(data.postedDate)}</Card.Link>
      </Card.Body>
    </Card>
  )
}

export default JobCards;