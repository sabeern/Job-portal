import React from 'react';
import { Form } from 'react-bootstrap';

function FormInputbox({data}) {
  return (
      <Form.Group className={data.class} controlId="formBasicElement">
          <Form.Label>{data.label}</Form.Label>
          <Form.Control type={data.type} placeholder={data.placeholder} />
      </Form.Group>
  )
}

export default FormInputbox;