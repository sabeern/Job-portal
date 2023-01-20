import React, { useState } from 'react';
import ProfilePicModal from '../../containers/employee/ProfilePicModal';

function ChangeProfileImage() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <ProfilePicModal data={{ show, handleClose }}></ProfilePicModal>
    </>
  )
}
export default ChangeProfileImage;