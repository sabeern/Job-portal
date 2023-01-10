import React from 'react';
import { Card } from 'react-bootstrap';
import { BsFillCreditCardFill } from "react-icons/bs";

function EmprJobCard() {
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Card.Title style={{fontWeight:'600'}}>Mern Stack Developer</Card.Title>
        <Card.Title>Techno Technologies Ltd</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Cochin, Kerala</Card.Subtitle>
        <Card.Title style={{fontWeight:'600'}}><BsFillCreditCardFill/> ₹ 10000 - ₹ 20000 </Card.Title>
        <Card.Subtitle className="text-muted">Skills Required</Card.Subtitle>
        <Card.Text>
        Javascript, Node Js, React, Bootstrap, Mongo DB
        </Card.Text>
        <Card.Link style={{textDecoration:'none'}}>Posted on 27/12/2022</Card.Link>
        <Card.Link style={{textDecoration:'none',paddingLeft:'60px'}}>Applied (10 Candidates) </Card.Link>
      </Card.Body>
    </Card>
  )
}

export default EmprJobCard;