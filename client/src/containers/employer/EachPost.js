import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';

function EachPost({data}) {
  return (
      <>
        <MDBContainer className="my-2 d-flex">
            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                className="rounded-circle" alt="Avatar" style={{width:'70px',height:'auto'}}/>
            <p><span style={{paddingTop:'16px',paddingLeft:'30px',fontSize:'20px',fontWeight:700}}>Sabeer Neyyan</span>
                <br/>
                <span style={{paddingLeft:'30px'}}>28/12/2022</span>
            </p>
        </MDBContainer>
            <p>{data ? data.post.postDescription : ''}</p>
            <img src={data ? data.post.postImage : ''} alt="Posts" style={{maxHeight:'500px',maxWidth:'100%'}}></img>
      </>
  )
}

export default EachPost;