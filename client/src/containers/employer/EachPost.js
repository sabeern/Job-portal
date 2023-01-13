import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { returnNewDate } from '../../other/DateDisplay';

function EachPost({data}) {
    const user = useSelector((store) => store.allUsers.user);
  return (
      <>
        <MDBContainer className="my-2 d-flex">
            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                className="rounded-circle" alt="Avatar" style={{width:'70px',height:'auto'}}/>
            <p><span style={{paddingTop:'16px',paddingLeft:'30px',fontSize:'20px',fontWeight:700}}>{user ? user.firstName+' '+user.lastName : ''}</span>
                <br/>
                <span style={{paddingLeft:'25px',color:'#757982'}}><i>{data ? returnNewDate(data.post.addedDate) : ''}</i></span>
            </p>
        </MDBContainer>
            <p>{data ? data.post.postDescription : ''}</p>
            <img src={data ? data.post.postImage : ''} alt="Posts" style={{maxHeight:'500px',maxWidth:'100%'}}></img>
      </>
  )
}

export default EachPost;