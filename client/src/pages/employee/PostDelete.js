import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteConfirmationModal from '../../containers/common/DeleteConfirmationModal';

function PostDelete() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const postId = useParams();
  return (
    <>
      <DeleteConfirmationModal data={{ show, handleClose, type: 'post', id: postId.id }} />
    </>
  )
}

export default PostDelete;