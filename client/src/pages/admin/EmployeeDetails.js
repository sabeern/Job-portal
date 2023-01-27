import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { instance } from '../../apis/JobSolutionApi';
import AdminNavbar from '../../containers/admin/AdminNavbar';
import EmployeeList from '../../containers/admin/EmployeeList';
import { returnNewDate } from '../../other/DateDisplay';

function EmployeeDetails() {
  const [employeeDetails, setEmployeeDetails] = useState();
  useEffect(() => {
    instance.get('/admin/management/getEmployeeDetails').then((res) => {
      const empDetails = res.data.empDetails;
      let details = empDetails.map((val, index) => {
        let blockStatus;
        if(val.blockStatus) {
          blockStatus = 'Blocked';
        }else {
          blockStatus = 'None';
        }
        let data = {
          slNo: ++index,
          name: val.firstName + ' ' + val.lastName,
          jobTitle: val.jobTitle,
          contactNumber: val.contactNumber,
          registeredDate: returnNewDate(val.registeredDate),
          blockStatus:blockStatus,
          block:<Link to={`/admin/blockConfirmation/${val._id}/${val.blockStatus}`}><button style={{borderRadius:'10px'}}>Block/Unblock</button></Link>
        }
        return data;
      });
      setEmployeeDetails(details);
    }).catch((err) => {

    });
  }, []);
  return (
    <>
      <AdminNavbar />
      <Container>
        <Row>
          <Col md={12}>
            {employeeDetails && <EmployeeList data={employeeDetails} />}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EmployeeDetails;