import React, { useEffect, useState } from 'react';
import { Row,Col, Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { instance } from '../../apis/JobSolutionApi';

function EmployeeProfileDetails({data,jobId,appStatus}) {
    const [jobStatus, setJobStatus] = useState();
    const [statusColor, setStatusColor] = useState();
    useEffect(() => {
        if(appStatus) {
        if(appStatus.applicationStatus !== 'Not Processed') {
            setJobStatus(appStatus.applicationStatus);
        }
        if(appStatus.applicationStatus === 'Best Fit') {
            setStatusColor('green');
        }else {
            setStatusColor('red');
        }
    }
    },[appStatus]);
    const sendRespose = async (status) => {
        const token = localStorage.getItem('empToken');
        const headers = {'X-Custom-Header': `${token}`};
        await instance.put('/jobs/updateStatus',{status,applicationId:appStatus._id},{headers});
        if(status === 'Best Fit') {
            setStatusColor('green');
        }else {
            setStatusColor('red');
        }
        setJobStatus(status);
    }
  return (
    <Col md={6} className="overflow-auto mb-4 p-4" style={{maxHeight:'80vh'}}>
                <h1 className='mt-4'>
                    {data.firstName+" "+data.lastName }&nbsp;
                    <span style={{fontSize:'16px'}}>(Job ID : #{jobId})</span>
                </h1>
                <Row>
                   <Col md={12} className="p-4" style={{border:'1px solid black',borderRadius:'20px'}}>
                            <table style={{borderRadius:'20px'}}>
                                <tr>
                                    <td><b>Job Title</b></td>
                                    <td>{data.jobTitle}</td>
                                </tr>
                                <tr>
                                    <td><b>Qualification</b></td>
                                    <td>{data.qualification}</td>
                                </tr>
                                <tr>
                                    <td><b>Experience</b></td>
                                    <td>{data.experience}</td>
                                </tr>
                                <tr>
                                    <td><b>More Details</b></td>
                                    <td>{data.details}</td>
                                </tr>
                                <tr>
                                    <td>Contact Number</td>
                                    <td>{data.contactNumber}</td>
                                </tr>
                                <tr>
                                    <td><b>Resume</b></td>
                                    <td>
                                        <a href={`http://localhost:8000/resume/${data.resume}`} target="_blank">View Resume</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Application Status</b></td>
                                    <td>
                                        {jobStatus ? <span style={{color : statusColor}}><b>{jobStatus}</b></span> :
                                        <DropdownButton id="dropdown-basic-button" title="Select Status">
                                            <Dropdown.Item onClick={() => sendRespose('Best Fit')}>Best Fit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => sendRespose('Not Fit')}>Not Fit</Dropdown.Item>
                                        </DropdownButton>}
                                    </td>
                                </tr>
                            </table>
                            <Button variant="outline-success">Tag And Chat With Applicant</Button>
                    </Col> 
                </Row>      
        </Col>
  )
}

export default EmployeeProfileDetails;