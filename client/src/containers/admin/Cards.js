import React from 'react';
import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Cards({ data }) {
  return (
    <Card
      bg={data.bgColor}
      text='white'
      className="mb-2 mt-3"
    >
      <Card.Header>{data.title}</Card.Header>
      <Card.Body style={{overflow:'auto'}}>
        <Card.Title>{data.title2} </Card.Title>
        <BarChart
      width={1000}
      height={300}
      data={data.graphData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#82ca9d" />
    </BarChart>
      </Card.Body>
    </Card>
  )
}

export default Cards;