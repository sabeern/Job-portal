import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { instance } from '../../apis/JobSolutionApi';
import AdminNavbar from '../../containers/admin/AdminNavbar';
import Cards from '../../containers/admin/Cards';

function AdminHome() {
  const [err, setErr] = useState();
  const [empGraphData, setEmpGraphData] = useState();
  const [emprGraphData, setEmprGraphData] = useState();
  const [applicationCount, setApplicationCount] = useState();
  async function getDetails() {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { 'X-Custom-Header': `${token}` };
      const { data } = await instance.get('/admin/management/getDetails', { headers });
      const monthlyEmployeeCount = data.monthlyEmployeeCount;
      let empCount = {
        '2023-01': 0, '2023-02': 0, '2023-03': 0, '2023-04': 0, '2023-05': 0, '2023-06': 0, '2023-07': 0, '2023-08': 0, '2023-09': 0
        , '2023-10': 0, '2023-11': 0, '2023-12': 0
      };
      monthlyEmployeeCount.forEach((val) => {
        empCount[val._id] = val.count;
      })
      let newEmpCount = [];
      for (let val in empCount) {
        let data = {
          name: val,
          count: empCount[val]
        }
        newEmpCount.push(data);
      }
      setEmpGraphData(newEmpCount);
      const monthlyEmployerCount = data.monthlyEmployerCount;
      let emprCount = {
        '2023-01': 0, '2023-02': 0, '2023-03': 0, '2023-04': 0, '2023-05': 0, '2023-06': 0, '2023-07': 0, '2023-08': 0, '2023-09': 0
        , '2023-10': 0, '2023-11': 0, '2023-12': 0
      }
      monthlyEmployerCount.forEach((val) => {
        emprCount[val._id] = val.count;
      })
      let newEmprCount = [];
      for (let val in emprCount) {
        let data = {
          name: val,
          count: emprCount[val]
        }
        newEmprCount.push(data);
      }
      setEmprGraphData(newEmprCount);
      const applicationCount = data.applicationCount;
      let appCount = {
        '2023-01': 0, '2023-02': 0, '2023-03': 0, '2023-04': 0, '2023-05': 0, '2023-06': 0, '2023-07': 0, '2023-08': 0, '2023-09': 0
        , '2023-10': 0, '2023-11': 0, '2023-12': 0
      }
      applicationCount.forEach((val) => {
        appCount[val._id] = val.count;
      })
      let newAppCount = [];
      for (let val in appCount) {
        let data = {
          name: val,
          count: appCount[val]
        }
        newAppCount.push(data);
      }
      setApplicationCount(newAppCount);
    } catch (err) {
      setErr(err.response.data.errMsg);
    }
  }
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <>
      <AdminNavbar />
      <Container>
        <Row>
          <Col md={12}>
            <Cards data={{ bgColor: 'warning', graphData: empGraphData, title: 'Monthly registration count of job seeker', title2: 'Job Seeker Count' }} />
          </Col>
          <Col md={12}>
            <Cards data={{ bgColor: 'warning', graphData: emprGraphData, title: 'Monthly registration count of job provider', title2: 'Job Provider Count' }} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Cards data={{ bgColor: 'warning', graphData: applicationCount, title: 'Monthly job application count', title2: 'Job Application Count' }} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AdminHome;