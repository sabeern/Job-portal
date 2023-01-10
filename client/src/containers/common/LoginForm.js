import React from 'react';
import {
    MDBBtn,
    MDBCol
  }
  from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import MdbInputbox from '../../components/MdbInputbox';
import { Alert } from 'react-bootstrap';

function LoginForm({data}) {
  return (
        <MDBCol sm='6'>
          <div className='d-flex flex-row ps-5 pt-5'>
            <span className="h1 fw-bold mb-0" style={{ color: '#0D6EFD' }}><Link to="/" style={{textDecoration:'none'}}>JOB SOLUTIONS</Link></span>
          </div>
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>
                {data.loginErorr && <Alert variant='danger' className='mb-4 mx-5 w-100'>
                    {data.loginErorr}
                </Alert>}
                <MdbInputbox data={{label:'Email address', id:'formControlLg', type:'email', name:'userName', value:data.loginDetails.userName, handleChange:data.handleChange}}/>
                <MdbInputbox data={{label:'Password', id:'formControlLg', type:'password', name:'password', value:data.loginDetails.password, handleChange:data.handleChange}}/>
                <MDBBtn className="mb-4 px-5 mx-5 w-100" color='primary' size='lg' onClick={data.handleLogin}>Login</MDBBtn>
                <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
                <p className='ms-5'>Don't have an account? <Link to="/signup">
                    Register here</Link>
                </p>
          </div>
        </MDBCol>
  )
}

export default LoginForm;