import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsFillCreditCardFill } from "react-icons/bs";

function EachJobDetails() {
  return (
    <Card className="overflow-auto" style={{height:'70vh'}}>
      <Card.Header as="h5" style={{fontWeight:'600'}}>Mern Stack Developer</Card.Header>
      <Card.Body>
        <Card.Title>Techno Technologis Ltd</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Cochin, Kerala</Card.Subtitle>
        <Card.Title style={{fontWeight:'600'}}><BsFillCreditCardFill/> ₹ 10000 - ₹ 20000 </Card.Title>
        <Card.Subtitle className="text-muted">Skills Required</Card.Subtitle>
        <Card.Text>
        Javascript, Node Js, React, Bootstrap, Mongo DB
        </Card.Text>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}

export default EachJobDetails;