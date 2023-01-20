import React, { useState } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { returnNewDate } from '../../other/DateDisplay';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';

function EachPost({data, empName, profileImage}) {
    const user = useSelector((store) => store.allUsers.user);
    const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
const handleClose = () => setShow(false);
  return (
      <>
        <MDBContainer className="my-2 d-flex">
            {!empName && <img src={user.profileImage ? user.profileImage : 'http://localhost:8000/images/default.webp'}
                className="rounded-circle" alt="Avatar" style={{width:'70px',height:'70px'}}/>}
            {empName && <img src={profileImage ? profileImage : "http://localhost:8000/images/default.webp"}
                className="rounded-circle" alt="Avatar" style={{width:'70px',height:'70px'}}/>}
            <p>
                {!empName && <span style={{paddingTop:'16px',paddingLeft:'30px',fontSize:'20px',fontWeight:700}}>{user ? user.firstName+' '+user.lastName : ''}</span>}
                {empName && <span style={{paddingTop:'16px',paddingLeft:'30px',fontSize:'20px',fontWeight:700}}>{empName}</span>}
                <br/>
                <span style={{paddingLeft:'25px',color:'#757982'}}><i>{data ? returnNewDate(data.post.addedDate) : ''}</i></span>
                {!empName && <span className="text-danger" style={{marginLeft:'10px',textDecoration:'underline',cursor:'pointer'}} onClick={handleShow}>delete</span>}
            </p>
        </MDBContainer>
            <p>{data ? data.post.postDescription : ''}</p>
            <img src={data ? data.post.postImage : ''} alt="Posts" style={{maxHeight:'500px',maxWidth:'100%'}}></img>
            <DeleteConfirmationModal data={{show, handleClose, type:'post', id:data.post._id}} />
      </>
  )
}

export default EachPost;