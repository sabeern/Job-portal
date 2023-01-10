import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';

function EachPost() {
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
            <p>Complete first project in flutter.</p>
            <img src="https://static-cse.canva.com/blob/835508/create_instagram-post-creator_lead.jpg" alt="Posts" style={{maxHeight:'300px',maxWidth:'100%'}}></img>
      </>
  )
}

export default EachPost;