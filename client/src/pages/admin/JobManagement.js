import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { instance } from '../../apis/JobSolutionApi';
import AdminNavbar from '../../containers/admin/AdminNavbar';
import JobIssuesList from '../../containers/admin/JobIssuesList';
import ViewIssueModal from '../../containers/admin/ViewIssueModal';
import { returnNewDate } from '../../other/DateDisplay';

function JobManagement() {
    const [allIssues, setAllIssues] = useState();
    const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
const handleClose = () => setShow(false);
const [selectedIssue, setSelectedIssue] = useState();
const [selectedJobId, setSelectedJobId] = useState();
    const viewIssues = (issue, jobId) => {
        setSelectedIssue(issue);
        setSelectedJobId(jobId);
        handleShow(true);
    }
    const jobIssues = async () => {
        try {
            const {data} = await instance.get('/admin/management/jobs');
            const jobIssueDetails =  data.allJobIssues.map((val)=> {
                const viewDetailsMenu = <span style={{color:'blue',cursor:'pointer'}} onClick={()=>viewIssues(val.issue, val.job._id)}>View Details</span>;
                let block = val.job.listingStatus;
                const details = {
                    jobId:val.job.jobId,
                    jobTitle: val.job.jobTitle,
                    user : val.user.firstName+" "+val.user.lastName,
                    date : returnNewDate(val.issuedDate),
                    details : viewDetailsMenu
                }
                return details;
            })
            setAllIssues(jobIssueDetails);
        }catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        jobIssues();
    },[]);
  return (
    <>
        <AdminNavbar/>
        <Container className='mt-4'>
            <Row>
                <Col md={12}>
                    {allIssues && <JobIssuesList data={allIssues}/>}
                </Col>
            </Row>
        </Container>
        {selectedJobId && <ViewIssueModal data={{handleClose, selectedIssue, show}} jobId={selectedJobId}/>}
    </>
  )
}

export default JobManagement;