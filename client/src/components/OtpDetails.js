import React from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Spinner } from 'react-bootstrap';

function OtpDetails({ data }) {
  let resend;
  if (data.timer === '00:00:00') {
    resend = true;
  } else {
    resend = false;
  }
  return (
    <>
      <MDBInput wrapperClass='mx-5 w-100' name='userOtp' label='Enter Otp' value={data.value} onChange={data.handleChange} id='formControlLg' type='number' size="lg" />
      {resend ?
        <span class="text-primary text-center mb-4 mx-5" style={{ cursor: 'pointer' }} onClick={data.handleSubmit}>
          {data.loading ?
            <><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />Loading...</>
            : <u>Resent OTP</u>}
        </span>
        : <span class="text-danger text-center mb-4 mx-5"><b>{data.timer}</b></span>}
      <MDBBtn className="mb-4 px-5 mx-5 w-100" color='primary' size='lg' onClick={data.handleOtp}>Register Now</MDBBtn>
    </>
  )
}

export default OtpDetails;