import React from 'react';
import {
    MDBContainer,
    MDBRow
  }
  from 'mdb-react-ui-kit';
import LoginSignupImage from '../components/LoginSignupImage';
import LoginForm from '../containers/LoginForm';

function Login() {
  return (
        <MDBContainer fluid>
           <MDBRow>
              <LoginForm />
              <LoginSignupImage />
           </MDBRow>
        </MDBContainer>
  )
}

export default Login;