import React from 'react';

function DeleteConfirmationModal() {
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
                <Button variant="danger" onClick={blockJob}>
                        Yes
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default DeleteConfirmationModal;