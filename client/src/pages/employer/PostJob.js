import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../../containers/common/Header';
import PostJobForm from '../../containers/employer/PostJobForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../containers/common/Loader';

function PostJob() {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "", salaryRange: "", requiredSkills: "", moreDetails: ""
  });
  const navigate = useNavigate();
  const [jobErr, setJobErr] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = ({ currentTarget: input }) => {
    setJobDetails({ ...jobDetails, [input.name]: input.value });
  }
  const submitJob = async (e) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('empToken');
      const instance = axios.create({
        baseURL: 'https://job-solutions-server.onrender.com/',
        headers: { 'X-Custom-Header': `${token}` }
      });
      await instance.post('/user/postJob', jobDetails);
      navigate("/empProfile");
    } catch (error) {
      setJobErr(error.response.data.errMsg);
    }
    setLoading(false);
  }

  return (
    <>
      {loading && <Loader />}
      <Header />
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8} className="mb-4 mt-3" style={{ border: '1px solid #C2C3C2', borderRadius: '20px' }}>
            <PostJobForm data={{ jobDetails, handleChange, jobErr, submitJob }} />
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </>
  )
}

export default PostJob;