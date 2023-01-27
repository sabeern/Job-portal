import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { instance } from '../../apis/JobSolutionApi';
import AdminNavbar from '../../containers/admin/AdminNavbar';
import EmployerList from '../../containers/admin/EmployerList';
import { returnNewDate } from '../../other/DateDisplay';

function EmployerDetails() {
    const [employerDetails, setEmployerDetails] = useState();
  useEffect(() => {
    instance.get('/admin/management/getEmployerDetails').then((res) => {
      const emprDetails = res.data.emprDetails;
      let details = emprDetails.map((val, index) => {
        let blockStatus;
        console.log(val.blockStatus);
        if(val.blockStatus) {
          blockStatus = 'Blocked';
        }else {
          blockStatus = 'None';
        }
        let data = {
          slNo: ++index,
          name: val.companyName,
          jobTitle: val.companyLocation,
          registeredDate: returnNewDate(val.registeredDate),
          blockStatus:blockStatus,
          block:<Link to={`/admin/blockConfirmation/${val._id}/${val.blockStatus}`}><button style={{borderRadius:'10px'}}>Block/Unblock</button></Link>
        }
        return data;
      });
      setEmployerDetails(details);
    }).catch((err) => {

    });
  }, []);
  return (
    <>
    <AdminNavbar />
    <Container>
      <Row>
        <Col md={12}>
          {employerDetails && <EmployerList data={employerDetails} />}
        </Col>
      </Row>
    </Container>
  </>
  )
}

export default EmployerDetails;