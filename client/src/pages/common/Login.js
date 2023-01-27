import React, { useState } from 'react';
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import LoginSignupImage from '../../components/LoginSignupImage';
import LoginForm from '../../containers/common/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllJobs, fetchJobs, setEmployeePosts, setUser } from '../../redux/actions/UserAction';
import { instance } from '../../apis/JobSolutionApi';
import Loader from '../../containers/common/Loader';

function Login() {
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    userName: '', password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setLoginDetails({ ...loginDetails, [input.name]: input.value });
  }
  const [loginErorr, setLoginErorr] = useState();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('coming1');
      console.log(instance);
      const { data: res } = await instance.post("/signin", loginDetails);
      console.log('coming');
      console.log(res.token);
      localStorage.setItem("empToken", res.token);
      dispatch(setUser());
      if (res.user.userType === 'Job Provider') {
        dispatch(fetchJobs());
      } else {
        dispatch(fetchAllJobs());
        dispatch(setEmployeePosts());
      }
      navigate('/empProfile');
    } catch (error) {
      setLoading(false);
      setLoginErorr(error.response.data.errMsg);
    }
  }
  return (
    <>
      {loading && <Loader />}
      {(!loading) && (<MDBContainer fluid>
        <MDBRow>
          <LoginForm data={{ handleChange, loginDetails, handleLogin, loginErorr }} />
          <LoginSignupImage img="true" />
        </MDBRow>
      </MDBContainer>)}
    </>
  )
}

export default Login;