import React from 'react';
import {
    MDBInput
  }
  from 'mdb-react-ui-kit';

function MdbInputbox({data}) {
  return (
    <MDBInput wrapperClass='mb-4 mx-5 w-100' name={data.name} label={data.label} id={data.id} 
              type={data.type} value={data.value} onChange={data.handleChange} size="lg"/>
  )
}

export default MdbInputbox;