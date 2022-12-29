import React from 'react';
import {
  MDBContainer,
  MDBRow,
} from 'mdb-react-ui-kit';

import LoginSignupImage from '../components/LoginSignupImage';
import SignupForm from '../containers/SignupForm';

function Signup() {
  return (
    <MDBContainer fluid>
        <MDBRow>
          <LoginSignupImage/>
          <SignupForm />
        </MDBRow>
    </MDBContainer>
  )
}

export default Signup;