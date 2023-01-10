import React from 'react';
import MdbInputbox from '../../components/MdbInputbox';
import { Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBCol } from 'mdb-react-ui-kit';
import OtpDetails from '../../components/OtpDetails';

function SignupForm({details}) {
  return (
        <MDBCol sm='6'>
            <div className='d-flex flex-row ps-5 pt-5'>
                <span className="h1 fw-bold mb-0" style={{ color: '#0D6EFD' }}><Link to="/" style={{textDecoration:'none'}}>JOB SOLUTIONS</Link></span>
            </div>
            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                <h3 className="fw-normal mb-2 ps-5 pb-3" style={{letterSpacing: '1px'}}>Find or Post a job.</h3>
                {details.err && <Alert variant='danger' className='mb-4 mx-5 w-100'>
                    {details.err}
                </Alert>}
                {details.otp && <Alert variant='success' className='mb-4 mx-5 w-100'>
                    Please enter the otp and continue
                </Alert>}
                <MdbInputbox data={{label:'Email address', id:'formControlLg', type:'email', name:'userName', value:details.data.userName, handleChange:details.handleChange}}/>
                <Form.Select aria-label="Default select example" className='mb-4 mx-5 w-100' name='userType' onChange={details.handleChange}>
                    <option>Please select menu</option>
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="Job Provider">Job Provider</option>
                </Form.Select>
                <MdbInputbox data={{label:'Password', id:'formControlLg', type:'password', name:'password', value:details.data.password, handleChange:details.handleChange}}/>
                {details.otp ? <OtpDetails data={{value:details.data.userOtp, handleChange:details.handleChange, handleOtp:details.handleOtp, timer:details.timer, handleSubmit:details.handleSubmit, loading:details.loading}}/>
                : <MDBBtn className="mb-4 px-5 mx-5 w-100" color='primary' size='lg' disabled={details.loading} onClick={details.handleSubmit}>
                    {details.loading ? 
                        <><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                            Loading... </>: <>Send OTP</> }
                    </MDBBtn> }
                <p className='ms-5'>Already Register? <Link to="/signin">Signin here</Link></p>
            </div>
        </MDBCol>
  )
}

export default SignupForm;