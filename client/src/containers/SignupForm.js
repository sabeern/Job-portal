import React from 'react';
import MdbInputbox from '../components/MdbInputbox';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBCol } from 'mdb-react-ui-kit';

function SignupForm() {
  return (
        <MDBCol sm='6'>
            <div className='d-flex flex-row ps-5 pt-5'>
                <span className="h1 fw-bold mb-0" style={{ color: '#0D6EFD' }}><Link to="/" style={{textDecoration:'none'}}>JOB SOLUTIONS</Link></span>
            </div>
            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                <h3 className="fw-normal mb-2 ps-5 pb-3" style={{letterSpacing: '1px'}}>Find or Post a job.</h3>
                <MdbInputbox data={{label:'Email address', id:'formControlLg', type:'email'}}/>
                <Form.Select aria-label="Default select example" className='mb-4 mx-5 w-100'>
                    <option>Please select menu</option>
                    <option value="Employee">Employee</option>
                    <option value="Employer">Employer</option>
                </Form.Select>
                <MdbInputbox data={{label:'Password', id:'formControlLg', type:'password'}}/>
                <MDBBtn className="mb-4 px-5 mx-5 w-100" color='primary' size='lg'>Register Now</MDBBtn>
                <p className='ms-5'>Already Register? <Link to="/signin">Signin here</Link></p>
            </div>
        </MDBCol>
  )
}

export default SignupForm;