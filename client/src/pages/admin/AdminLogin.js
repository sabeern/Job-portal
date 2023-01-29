import React from 'react';
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import AdminLoginImage from '../../components/AdminLoginImage';
import AdminLoginForm from '../../containers/admin/AdminLoginForm';

function AdminLogin() {
  return (
    <>
      <MDBContainer fluid>
        <MDBRow>
          <AdminLoginImage img="true" />
          <AdminLoginForm />
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default AdminLogin;