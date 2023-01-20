import React from 'react';
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import LoginSignupImage from '../../components/LoginSignupImage';
import ForgotPasswordForm from '../../containers/common/ForgotPasswordForm';
function ForgotPassword() {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <ForgotPasswordForm />
        <LoginSignupImage img="true" />
      </MDBRow>
    </MDBContainer>
  )
}

export default ForgotPassword;