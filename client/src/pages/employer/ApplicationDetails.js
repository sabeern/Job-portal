import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../containers/common/Header';
import ApplicationsList from '../../containers/employer/ApplicationsList';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../apis/JobSolutionApi';
import Loader from '../../containers/common/Loader';
import { returnNewDate } from '../../other/DateDisplay';
import { useDispatch } from 'react-redux';
import { setSelectedJob } from '../../redux/actions/UserAction';


function ApplicationDetails() {
  const {jobId}= useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [applicant, setApplicant] = useState();
  const [loading, setLoading] = useState(true);
  const [allData,setAllData] = useState();
  const getApplication = async () => {
      const token = localStorage.getItem('empToken');
      const headers = {'X-Custom-Header': `${token}`};
      try {
        let res = await instance.get(`/jobs/jobApplications/${jobId}`,{headers});
        //setApplicant(res.data.applicant);
        const applicatDetails = res.data.applicant;
          const resData = applicatDetails.map((val) => {
            const viewDetialMenu = <Link to={`/appliedEmployeeProfile/${val.user._id}`} onClick={()=>setJobDetails(val.jobId)}>View Details</Link>;
           let userData = {
              name : val.user.firstName + ' ' + val.user.lastName,
              appliedData : returnNewDate(val.appliedDate),
              qualification : val.user.qualification,
              status : val.applicationStatus,
              viewDetails : viewDetialMenu
            }
            return userData;
          })
          setAllData(resData);
        setLoading(false);
      }catch(err) {
        navigate('/empProfile');
      }
  }
  useEffect(() => {
      getApplication();
  },[jobId]);
  const setJobDetails = async (jobId) => {
    const token = localStorage.getItem('empToken');
        const headers = {'X-Custom-Header': `${token}`};
    const res = await instance.get(`/jobs/getJobDetails/${jobId}`,{headers});
    dispatch(setSelectedJob(res.data.jobDetails));
  }
  return (
    <>
    {loading && <Loader />}
    <Container fluid>
          <Row>
            <Col md={12}>
              <Header />
            </Col>
          </Row>
    </Container>
    <Container>
        <Row className='mt-3'>
            <Col md={1}></Col>
            <Col md={10}>
                <div className="App">
                    <div class="heading">Applied Employees List</div>
                    {allData && <ApplicationsList data={allData}/>}
                </div>
            </Col>
            <Col md={1}></Col>
        </Row>
    </Container>
    </>
  )
}

export default ApplicationDetails;
