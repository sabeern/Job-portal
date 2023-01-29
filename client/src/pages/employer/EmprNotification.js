import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { instance } from '../../apis/JobSolutionApi';
import Header from '../../containers/common/Header';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

function EmprNotification() {
    const user = useSelector((store) => store.allUsers.user);
    const [notification, setNotification] = useState();
    useEffect(() => {
        const token = localStorage.getItem('empToken');
        const headers = { 'X-Custom-Header': `${token}` };
        instance.get('/jobs/notification/' + user._id, { headers }).then((res) => {
            setNotification(res.data.notifications);
        }).catch((err) => {

        })
    }, [])
    return (
        <>
            <Header />
            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <div className="m-4 p-4" style={{ border: '1px solid black', borderRadius: '20px' }}>
                        {notification && notification.map((val) => {
                            return (
                                <>
                                <Link to={`/jobApplications/${val.jobId}`} style={{textDecoration:'none',cursor:'pointer'}}>
                                    <p>{val.message} - <span style={{ color: 'blue' }}><i>{format(val.createdAt)}</i></span></p>
                                    <hr />
                                </Link>
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