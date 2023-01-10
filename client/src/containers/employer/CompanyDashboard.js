import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EmprJobCard from './EmprJobCard';

function CompanyDashboard() {
  const jobs = useSelector((store) => store.allJobs.jobs);
  let jobStatus;
  if(jobs.length > 0) {
    jobStatus = true;
  }else {
    jobStatus = false;
  }
  return (
    <div className='mt-3'>
        {jobStatus ?  
        (
          <Container>
            <Row>
              <Col md={10}>
              { jobs.map((job,index) => {
                  return (<EmprJobCard key={index} jobDetails={job}/>);
              }) }
              </Col>
            </Row>
          </Container>
        ) : <div style={{marginTop:'200px'}}><h1>You are currently not posted any jobs</h1></div>
        }
    </div>
  )
}

export default CompanyDashboard;