import React from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { instance } from '../../apis/JobSolutionApi';

function DeleteConfirmationModal({data}) {
    const deleteData = async () => {
        console.log(data.type);
        if(data.type === 'job') {
            await instance.delete(`/jobs/deleteJob/${data.id}`);
            data.handleClose();
        }
        if(data.type === 'post') {
            console.log('here')
            await instance.delete(`/post/deletePost/${data.id}`);
            data.handleClose();
        }
    }
  return (
    <Modal show={data.show} onHide={data.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Please Select</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure want to delete</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={data.handleClose}>
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