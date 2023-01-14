import React from 'react';
import { Card } from 'react-bootstrap';
import { BsFillCreditCardFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { setSelectedJob } from '../../redux/actions/UserAction';
import { returnNewDate } from '../../other/DateDisplay';

function JobCards({data}) {
  const dispatch = useDispatch();
  return (
    <Card className='mb-3' style={{cursor:'pointer'}} onClick={()=>dispatch(setSelectedJob(data))}>
      <Card.Body>
        <Card.Title style={{fontWeight:'600'}}>{data.jobTitle}</Card.Title>
        <Card.Title>{data.user.companyName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{data.user.companyLocation}</Card.Subtitle>
        <Card.Title style={{fontWeight:'600'}}><BsFillCreditCardFill/> ₹ {data.salaryRange} <span style={{fontWeight:'300'}}>(Monthly)</span></Card.Title>
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