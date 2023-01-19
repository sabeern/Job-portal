import React from 'react';
import { Card } from 'react-bootstrap';

function Cards({data}) {
  return (
    <Card
          bg={data.bgColor}
          text='white'
          className="mb-2 mt-3"
        >
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
  )
}

export default Cards;