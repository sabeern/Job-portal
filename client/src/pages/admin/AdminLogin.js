import React, { useState } from 'react';
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import AdminLoginImage from '../../components/AdminLoginImage';
import Loader from '../../containers/common/Loader';
import AdminLoginForm from '../../containers/admin/AdminLoginForm';

function AdminLogin() {
  const [loading, setLoading] = useState();
  return (
    <>
      {loading && <Loader />}
      <MDBContainer fluid>
        <MDBRow>
          <AdminLoginImage img="true" />
          <AdminLoginForm data={{}} />
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default AdminLogin;