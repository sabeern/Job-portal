import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { instance } from '../../apis/JobSolutionApi';
import Loader from './Loader';

function ReportModal({data}) {
  const [jobIssue, setJobIssue] = useState();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState();
  const handleChange = (e) => {
      setJobIssue(e.target.value);
  }
  const userId = useSelector((store) => store.allUsers.user._id);
  const submitIssue = async (e) => {
    e.preventDefault();
    setLoading(true);
    const postData = {jobIssue, jobId:data.jobId, userId};
    try {
        await instance.post('/jobs/reportIssue', postData);
        setJobIssue('');
        data.handleClose();
    }catch(err) {
        setErr(err.response.data.errMsg);
    }
    setLoading(false);
  }
  useEffect(() => {
      return() => {
        setErr('');
        setJobIssue('');
      }
  },[data]);
  return (
    <>
    {loading && <Loader/>}
    <Modal show={data.show} onHide={data.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Report Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {err && <Alert variant='danger' className='mb-4 w-100'>
                    {err}
                </Alert>}
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Describe your problems below.</Form.Label>
                    <Form.Control as="textarea" rows={2} value={jobIssue} onChange={handleChange}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={data.handleClose}>
                        Close
                </Button>
                <Button variant="primary" onClick={submitIssue}>
                        Report to Job Solutions
                </Button>
            </Modal.Footer>
        </Modal>
        </>
  )
}

export default ReportModal;