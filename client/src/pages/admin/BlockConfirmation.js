import React, { useState } from 'react';
import BlockConfirmationModal from '../../containers/admin/BlockConfirmationModal';

function BlockConfirmation() {
    const [show, setShow] = useState(true);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  return (
    <>
        <BlockConfirmationModal data={{show, handleClose}}/>
    </>
  )
}

export default BlockConfirmation;