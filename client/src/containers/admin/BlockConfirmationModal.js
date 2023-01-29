import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../apis/JobSolutionApi';

function BlockConfirmationModal({ data }) {
    const [err, setErr] = useState();
    const navigate = useNavigate();
    const employerDetails = useParams();
    const blockHandle = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const headers = { 'X-Custom-Header': `${token}` }
            await instance.put('/admin/management/blockUnblockUser', employerDetails, { headers });
            navigate(-1)
        } catch (err) {
            setErr(err.response.data.errMsg);
        }
    }
    let status;
    let btnColor;
    if (employerDetails.status === 'true') {
        status = 'Unblock';
        btnColor = 'primary';
    } else if (employerDetails.status === 'false') {
        status = 'Block';
        btnColor = 'danger';
    }
    return (
        <>
            <Modal show={data.show} onHide={() => navigate(-1)}>
                <Modal.Header closeButton>
                    <Modal.Title>Please Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {err && <Alert variant='danger' className='mb-4 w-100'>
                        {err}
                    </Alert>}
                    <p>Do you want to {status} user</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button variant={btnColor} onClick={() => blockHandle()}>
                        {status}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BlockConfirmationModal;