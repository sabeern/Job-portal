import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { instance } from '../../apis/JobSolutionApi';

function ViewIssueModal({data, jobId}) {
const [blockStatus, setBlockStatus] = useState();
const [reload, setReload] = useState();
const getJobDetails = async () => {
    const {data} = await instance.get(`/jobs/getJobDetails/${jobId}`);
    setBlockStatus(data.jobDetails.listingStatus);
}
const blockJob = async () => {
    await instance.put('/admin/management/blockJob', {jobId, blockStatus});
    setReload(!reload);
    data.handleClose();
}
useEffect(() => {
    getJobDetails();
},[jobId,reload])
  return (
    <Modal show={data.show} onHide={data.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Issue Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{data.selectedIssue}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={data.handleClose}>
                        Close
                </Button>
                {blockStatus ? <Button variant="primary" onClick={blockJob}>
                        Block Job
                </Button> : 
                <Button variant="danger" onClick={blockJob}>
                        Unblock Job
                </Button>}
            </Modal.Footer>
        </Modal>
  )
}

export default ViewIssueModal;