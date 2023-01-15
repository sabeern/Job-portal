import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { BsFillCreditCardFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { instance } from '../../apis/JobSolutionApi';
import { returnNewDate } from '../../other/DateDisplay';

function EmprJobCard({jobDetails}) {
const [appCount, setAppCount] = useState(0);
  useEffect(() => {
      if(jobDetails) {
        const jobId = jobDetails._id;
        instance.get(`/jobs/applicantCount/${jobId}`)
          .then((res) =>setAppCount(res.data.appCount));
      }
  },[jobDetails]);
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Card.Title style={{fontWeight:'600'}}>{jobDetails.jobTitle}</Card.Title>
        <Card.Title>{jobDetails.user.companyName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{jobDetails.user.companyLocation}</Card.Subtitle>
        <Card.Title style={{fontWeight:'600'}}><BsFillCreditCardFill/> ₹ {jobDetails.salaryRange} </Card.Title>
        <Card.Subtitle className="text-muted">Skills Required</Card.Subtitle>
        <Card.Text>
            {jobDetails.requiredSkills}
        </Card.Text>
        <Card.Link style={{textDecoration:'none'}}>Posted on {returnNewDate(jobDetails.postedDate)}</Card.Link>
        <Card.Link style={{textDecoration:'none',paddingLeft:'60px'}}>
          <Link to={`/jobApplications/${jobDetails._id}`} target="_blank">Applied ({appCount} Candidates) </Link>
        </Card.Link>
      </Card.Body>
    </Card>
  )
}

export default EmprJobCard;