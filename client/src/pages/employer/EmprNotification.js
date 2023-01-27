import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { instance } from '../../apis/JobSolutionApi';
import Header from '../../containers/common/Header';
import { format } from 'timeago.js';

function EmprNotification() {
    const user = useSelector((store)=>store.allUsers.user);
    const [notification, setNotification] = useState();
    useEffect(() => {
        instance.get('/jobs/notification/'+user._id).then((res) => {
            setNotification(res.data.notifications);
        }).catch((err)=> {

        })
    },[])
  return (
    <>
    <Header/>
    <Row>
        <Col md={2}></Col>
        <Col md={8}>
            <div className="m-4 p-4" style={{border:'1px solid black', borderRadius:'20px'}}>
                {notification && notification.map((val)=> {
                    return(
                        <>
                        <p>{val.message} - <span style={{color:'blue'}}><i>{format(val.addedTime)}</i></span></p>
                        <hr/>
                        </>
                    )
                })}
            </div>
        </Col>
        <Col md={2}></Col>
    </Row>
    </>
  )
}

export default EmprNotification;