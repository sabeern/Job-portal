import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow
  }
  from 'mdb-react-ui-kit';
import LoginSignupImage from '../components/LoginSignupImage';
import LoginForm from '../containers/LoginForm';

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    userName : '',
    password : ''
  });
  const handleChange = ({ currentTarget: input }) => {
		setLoginDetails({ ...loginDetails, [input.name]: input.value });
	}
  return (
        <MDBContainer fluid>
           <MDBRow>
              <LoginForm data={{handleChange, loginDetails}}/>
              <LoginSignupImage />
           </MDBRow>
        </MDBContainer>
  )
}

export default Login;