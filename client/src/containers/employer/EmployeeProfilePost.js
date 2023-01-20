import React from 'react';
import EachPost from './EachPost';
import { Row, Col } from 'react-bootstrap';

function EmployeeProfilePost({data, empName, profileImage}) {
  return (
        <Col md={6} className="overflow-auto p-3" style={{maxHeight:'80vh'}}>
    {data &&
        data.map((post, index) => {
          return(
            <><EachPost data={{post}} key={index} empName={empName} profileImage={profileImage}/><hr/></>
          );
        })
      }
      </Col>
  )
}

export default EmployeeProfilePost;