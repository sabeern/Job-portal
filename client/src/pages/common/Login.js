import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow
  }
  from 'mdb-react-ui-kit';
import LoginSignupImage from '../../components/LoginSignupImage';
import LoginForm from '../../containers/common/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllJobs, fetchJobs, setEmployeePosts, setUser } from '../../redux/actions/UserAction';
import { instance } from '../../apis/JobSolutionApi';

function Login() {
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    userName : '',
    password : ''
  });
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
		setLoginDetails({ ...loginDetails, [input.name]: input.value });
	}
  const [loginErorr,setLoginErorr] = useState();
  const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/signin";
			 const {data : res} = await instance.post(url, loginDetails);
       localStorage.setItem("empToken", res.token);
       dispatch(setUser());
       if(res.user.userType === 'Job Provider') {
        dispatch(fetchJobs());
       }else {
        dispatch(fetchAllJobs());
        dispatch(setEmployeePosts());
       }
       navigate('/empProfile');
		} catch (error) {
      console.log(error.response.data.errMsg);
      setLoginErorr(error.response.data.errMsg);
		}
	}
  return (
        <MDBContainer fluid>
           <MDBRow>
              <LoginForm data={{handleChange, loginDetails, handleLogin, loginErorr}}/>
              <LoginSignupImage img="true"/>
           </MDBRow>
        </MDBContainer>
  )
}

export default Login;