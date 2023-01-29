import React, { useState } from 'react';
import { MDBBtn, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { instance } from '../../apis/JobSolutionApi';
import Loader from './Loader';
function ForgotPasswordForm() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(false);
    const [otpStatus, setOtpStatus] = useState(false);
    const [verifiedStatus, setVerifiedStatus] = useState(false);
    const [err, setErr] = useState(false);
    const [msg, setMsg] = useState(false);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(false);
    const handleOtp = async () => {
        setLoading(true);
        try {
            const res = await instance.post('/signup/restPassword', { userName: email });
            setErr(false);
            setOtpStatus(true);
            setUserId(res.data.userId);
            setMsg(res.data.msg);
        } catch (err) {
            setMsg(false);
            setErr(err.response.data.errMsg);
        }
        setLoading(false);
    }
    const validateOtp = async () => {
        setLoading(true);
        try {
            await instance.post('/signup/validateResetOtp', { userName: email, userOtp: otp });
            setMsg(false);
            setErr(false);
            setVerifiedStatus(true);
        } catch (err) {
            setMsg(false);
            setErr(err.response.data.errMsg);
        }
        setLoading(false);
    }
    const updatePassword = async () => {
        setLoading(true);
        try {
            await instance.post('/signup/updatePassword', { userId, password });
            navigate('/signin');
        } catch (err) {
            setErr('Password updation failed');
        }
        setLoading(false);
    }
    if (!verifiedStatus) {
        return (
            <>
                {loading && <Loader />}
                <MDBCol sm='6'>
                    <div className='d-flex flex-row ps-5 pt-5'>
                        <span className="h1 fw-bold mb-0" style={{ color: '#0D6EFD' }}><Link to="/" style={{ textDecoration: 'none' }}>JOB SOLUTIONS</Link></span>
                    </div>
                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Reset your password</h3>
                        {err && <Alert variant='danger' className='mb-4 mx-5 w-100'>
                            {err}
                        </Alert>
                        }
                        {msg && <Alert variant='success' className='mb-4 mx-5 w-100'>
                            {msg}
                        </Alert>
                        }
                        <MDBInput wrapperClass='mb-4 mx-5 w-100' type='email' disabled={otpStatus} name="userName" label='Email address' id='formControlLg' value={email} onChange={(e) => setEmail(e.target.value)} size="lg" />
                        {otpStatus ?
                            (<><MDBInput wrapperClass='mb-4 mx-5 w-100' type='number' name="otp" label='Enter Otp' id='formControlLg' value={otp} onChange={(e) => setOtp(e.target.value)} size="lg" />
                                <MDBBtn className="mb-4 px-5 mx-5 w-100" color='primary' size='lg' onClick={validateOtp}>Next</MDBBtn></>)
                            :
                            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='primary' size='lg' onClick={handleOtp}>Next</MDBBtn>

                        }
                        <p className='ms-5'>Already Register?
                            <Link to="/signin"> Signin here </Link>
                        </p>
                    </div>
                </MDBCol>
            </>
        )
    } else {
        return (
            <>
                {loading && <Loader />}
                <MDBCol sm='6'>
                    <div className='d-flex flex-row ps-5 pt-5'>
                        <span className="h1 fw-bold mb-0" style={{ color: '#0D6EFD' }}><Link to="/" style={{ textDecoration: 'none' }}>JOB SOLUTIONS</Link></span>
                    </div>
                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Reset your password</h3>
                        {err &&
                            <Alert variant='danger' className='mb-4 mx-5 w-100'> {err}</Alert>
                        }
                        <MDBInput wrapperClass='mb-4 mx-5 w-100' type='password' name="password" label='New Password' id='formControlLg' value={password} onChange={(e) => setPassword(e.target.value)} size="lg" />
                        <MDBBtn className="mb-4 px-5 mx-5 w-100" color='primary' size='lg' onClick={updatePassword}>Update</MDBBtn>
                        <p className='ms-5'>No need to continue?
                            <Link to="/signin"> Cancel </Link>
                        </p>
                    </div>
                </MDBCol>
            </>
        )
    }
}

export default ForgotPasswordForm;