import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../apis/JobSolutionApi';

function DeleteConfirmationModal({ data }) {
    const navigate = useNavigate();
    const deleteData = async () => {
        if (data.type === 'job') {
            const token = localStorage.getItem('empToken');
            const headers = { 'X-Custom-Header': `${token}` };
            await instance.delete(`/jobs/deleteJob/${data.id}`, { headers });
        }
        if (data.type === 'post') {
            const token = localStorage.getItem('empToken');
            const headers = { 'X-Custom-Header': `${token}` };
            await instance.delete(`/post/deletePost/${data.id}`, { headers });
        }
        navigate('/empProfile');
    }
    const closeFunction = () => {
        navigate('/empProfile')
    }
    return (
        <Modal show={data.show} onHide={closeFunction}>
            <Modal.Header closeButton>
                <Modal.Title>Please Select</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure want to delete</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeFunction}>
                    No
                </Button>
                <Button variant="danger" onClick={deleteData}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmationModal;