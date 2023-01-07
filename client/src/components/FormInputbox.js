import React from 'react';
import { Form } from 'react-bootstrap';

function FormInputbox({data}) {
  return (
      <Form.Group className={data.class} controlId="formBasicElement">
          <Form.Label>{data.label}</Form.Label>
          <Form.Control type={data.type} placeholder={data.placeholder} onChange={data.handleChange} value={data.value} name={data.name} disabled={data.disabled}/>
      </Form.Group>
  )
}

export default FormInputbox;