import React from 'react';
import { MDBCol } from 'mdb-react-ui-kit';

function LoginSignupImage() {
  return (
    <MDBCol sm='6' className='d-none d-sm-block px-0'>
        <input type="image"  img src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202010/jobs_660_130920052343_291020052310.jpg?size=948:533"
          alt="Signup image" className="w-100" style={{objectFit: 'fit', objectPosition: 'left',height:'100vh'}} />
      </MDBCol>
  )
}

export default LoginSignupImage