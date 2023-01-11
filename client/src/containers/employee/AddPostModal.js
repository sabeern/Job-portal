import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function AddPostModal({data}) {
  return (
        <Modal show={data.show} onHide={data.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control as="textarea" rows={2} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Select Image</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={data.handleClose}>
                        Close
                </Button>
                <Button variant="primary" onClick={data.handleClose}>
                        Post
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default AddPostModal;