import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../apis/JobSolutionApi';
import Header from '../../containers/common/Header';
import EmployeeProfileDetails from '../../containers/employer/EmployeeProfileDetails';
import EmployeeProfilePost from '../../containers/employer/EmployeeProfilePost';
import "../../stylesheet/scrollStyle.css";

function AppEmployeeProfile() {
  const { empId } = useParams();
  const navigate = useNavigate();
  const [empProfile, setEmpProfile] = useState();
  const [empPost, setEmpPost] = useState();
  const [appStatus, setAppStatus] = useState();
  const [tagStatus, setTagStatus] = useState();
  const getEmployeeProfile = async () => {
      try {
          const res = await instance.get(`/jobs/empDetails/${empId}`);
          setEmpProfile(res.data.empProfile);
          setEmpPost(res.data.employeePosts);
      }catch(err) {
          navigate('/empProfile');
      }
  }
  const jobDetails = useSelector((store) => store.selectedJob.job);
      const getJobStatus = async () => {
      const token = localStorage.getItem('empToken');
      const headers = {'X-Custom-Header': `${token}`};
      const {data} = await instance.get(`/jobs/getJobApplication/${jobDetails._id}-${empId}`,{headers});
      setAppStatus(data.jobDetails);
      setTagStatus(data.jobDetails.tagStatus);
    }
  useEffect(() => {
    getEmployeeProfile()
    getJobStatus();
  },[empId]);
  return (
    <>
        <Header />
        <Container>
          <Row>
                {empProfile && <EmployeeProfileDetails data={empProfile} jobId={jobDetails.jobId} appStatus={appStatus} tagStatus={tagStatus} setTagStatus={setTagStatus}/>}
                  {empPost && <EmployeeProfilePost data={empPost} empName={empProfile.firstName+" "+empProfile.lastName} profileImage={empProfile.profileImage}/>}
          </Row>
        </Container>
    </>
  )
}

export default AppEmployeeProfile;