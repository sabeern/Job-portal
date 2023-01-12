import React from 'react';
import Header from '../../containers/common/Header';
import JobCards from '../../containers/employee/JobCards';
import EachJobDetails from '../../containers/employee/EachJobDetails';
import {Row, Container, Col} from 'react-bootstrap';
import SearchBox from '../../containers/employee/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedJob } from '../../redux/actions/UserAction';

function Home() {
  const allJobs = useSelector((store) => store.allJobs.jobs);
  const dispatch = useDispatch();
  if(allJobs && allJobs.length > 0) {
         dispatch(setSelectedJob(allJobs[0]));
  }
  return (
      <>
        <Container fluid>
          <Row>
            <Col md={12}>
              <Header />
            </Col>
          </Row>
        </Container>
        <Container>
          <hr/>
          <SearchBox />
          <Row>
            <Col md={6} className="overflow-auto" style={{height:'70vh'}}>
              {
                allJobs.map((job, index) => {
                  return(
                    <JobCards key={index} data={job}/>
                  );
                })
              }
            </Col>
            <Col md={6}>
                <EachJobDetails/>
            </Col>
          </Row>
        </Container>
      </>
  )
}

export default Home;