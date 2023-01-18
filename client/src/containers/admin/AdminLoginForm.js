import React, { useState } from 'react';
import { MDBBtn, MDBCol } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import MdbInputbox from '../../components/MdbInputbox';
import { Alert } from 'react-bootstrap';
import { instance } from '../../apis/JobSolutionApi';

function AdminLoginForm({data}) {
  const [loginData, setLoginData] = useState({
          userName : "",
          password : ""
  });
  const [err, setErr] = useState();
  const navigate = useNavigate();
const handleChange = ({currentTarget : input}) => {
      setLoginData({...loginData, [input.name]:input.value})
}
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.post('/admin/login', loginData);
      navigate('/admin/dashboard');
    }catch(err) {
      setErr(err.response.data.errMsg);
    }
}
  return (
        <MDBCol sm='6'>
          <div className='d-flex flex-row ps-5 pt-5'>
            <span className="h1 fw-bold mb-0" style={{ color: '#0D6EFD' }}><Link to="/" style={{textDecoration:'none'}}>JOB SOLUTIONS</Link></span>
          </div>
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Admin Login</h3>
                {err && <Alert variant='danger' className='mb-4 mx-5 w-100'>
                    {err}
                </Alert>}
                <MdbInputbox data={{label:'Email address', id:'formControlLg', type:'email', name:'userName', value:loginData.userName, handleChange:handleChange}}/>
                <MdbInputbox data={{label:'Password', id:'formControlLg', type:'password', name:'password', value:loginData.password, handleChange:handleChange}}/>
                <MDBBtn className="mb-4 px-5 mx-5 w-100" color='primary' size='lg' onClick={handleSubmit}>Login</MDBBtn>
          </div>
        </MDBCol>
  )
}

export default AdminLoginForm;