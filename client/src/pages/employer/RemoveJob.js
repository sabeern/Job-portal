import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteConfirmationModal from '../../containers/common/DeleteConfirmationModal';

function RemoveJob() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const jobId = useParams();
  return (
    <>
      <DeleteConfirmationModal data={{ show, handleClose, type: 'job', id: jobId.id }} />
    </>
  )
}

export default RemoveJob;