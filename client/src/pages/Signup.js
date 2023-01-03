import React, {useState, useRef} from 'react';
import {
  MDBContainer,
  MDBRow,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginSignupImage from '../components/LoginSignupImage';
import SignupForm from '../containers/SignupForm';

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
		userName: "",
		userType: "",
		password: "",
    userOtp: ""
	});
  const [err,setErr] = useState('');
  const [otp,setOtp] = useState(false);
  const [loading,setLoading] = useState(false);
  const Ref = useRef(null);
const [timer, setTimer] = useState('00:00:00');
const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
        total, hours, minutes, seconds
      };
  }

const startTimer = (e) => {
    let { total, hours, minutes, seconds }= getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
          (hours > 9 ? hours : '0' + hours) + ':' +
          (minutes > 9 ? minutes : '0' + minutes) + ':'
          + (seconds > 9 ? seconds : '0' + seconds)
        )
      }
  }
const clearTimer = (e) => {
    setTimer('00:02:00');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
        startTimer(e);
          }, 1000)
      Ref.current = id;
  }
const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  }
const handleSubmit = async (e) => {
		e.preventDefault();
    setLoading(true);
		try {
			const url = "http://localhost:8000/signup";
			 await axios.post(url, data);
       setErr('');
      setOtp(true);
      clearTimer(getDeadTime());
      setLoading(false);
		} catch (error) {
      setLoading(false);
      setErr(error.response.data.errMsg);
		}
	}
  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	}
  const handleOtp = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/signup/validateOtp";
			 await axios.post(url, data);
			navigate("/signin");
		} catch (error) {
      setErr(error.response.data.errMsg);
		}
	}
  return (
    <MDBContainer fluid>
        <MDBRow>
          <LoginSignupImage/>
          <SignupForm details={{data, handleChange:handleChange, handleSubmit:handleSubmit, err, otp, handleOtp, timer, loading}}/>
        </MDBRow>
    </MDBContainer>
  )
}

export default Signup;