import React, { useEffect, useState } from 'react';
import { Card, Button, CarouselItem } from 'react-bootstrap';
import { BsFillCreditCardFill, BsFillFlagFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { returnNewDate } from '../../other/DateDisplay';
import { instance } from '../../apis/JobSolutionApi';
import ReportModal from '../common/ReportModal';

function EachJobDetails() {
  const job = useSelector((store) => store.selectedJob.job);
  const [applyStatus, setApplyStatus] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
const handleClose = () => setShow(false);
  const applyJob = async (jobId) => {
        const token = localStorage.getItem('empToken');
        const headers = {'X-Custom-Header': `${token}`};
        try {
          await instance.post('/jobs/applyJob', {jobId} , {headers : headers});
          setApplyStatus(true);
        }catch(err) {
          //console.log(err);
        }
  }
  useEffect(() => {
        if(job) {
          const token = localStorage.getItem('empToken');
          const headers = {'X-Custom-Header': `${token}`};
          instance.post('/jobs/applyStatus', {jobId:job._id}, {headers : headers})
          .then((res) => {
            setApplyStatus(true);
          }).catch((err)=> {
            setApplyStatus(false);
          })
        }
  },[job]);
  return (
    <>
    <Card className="overflow-auto" style={{height:'70vh'}}>
      <Card.Header as="h5" style={{fontWeight:'600'}}>{job ? job.jobTitle : ''}</Card.Header>
      <Card.Body>
        <Card.Title>{job ? job.user.companyName : ''}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{job ? job.user.companyLocation : ''}</Card.Subtitle>
        <Card.Title style={{fontWeight:'600'}}><BsFillCreditCardFill/> ₹ {job ? job.salaryRange : ''} <span style={{fontWeight:'300'}}>(Monthly)</span></Card.Title>
        <Card.Subtitle className="text-muted">Skills Required</Card.Subtitle>
        <Card.Text>
        {job ? job.requiredSkills : ''}
        </Card.Text>
        <Card.Text>
        {job ? job.moreDetails : ''}
        </Card.Text>
        <Card.Link style={{textDecoration:'none'}}>Posted on {job ? returnNewDate(job.postedDate) : ''}</Card.Link><br/>
        { applyStatus ?
                <Card.Text className='mt-3' style={{color:'green'}}> &#10004; You Applied For This Job</Card.Text>
                :
        <Button variant="primary" className='mt-3' onClick={job ? ()=> applyJob(job._id) : ''}>Apply Now</Button>
         }
         <hr/>
         <Button className="btn btn-secondary" onClick={handleShow}><BsFillFlagFill/> Report Job</Button>
      </Card.Body>
    </Card>
    <ReportModal data={{handleClose,show,jobId:job._id}}/>
    </>
  )
}

export default EachJobDetails;