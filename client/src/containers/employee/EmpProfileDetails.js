import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function EmpProfileDetails() {
    const userDetails = useSelector((store) => store.allUsers.user);
    return (
        <>
            <Col md={6} className="overflow-auto mb-4 p-4" style={{ maxHeight: '80vh' }}>
                <h1 className='mt-4'>
                    Profile Information
                </h1>
                <Row>
                    <Col md={12} className="p-4" style={{ border: '1px solid black', borderRadius: '20px' }}>
                        <table style={{ borderRadius: '20px' }}>
                            <tr>
                                <td>
                                    <img src={userDetails.profileImage ? userDetails.profileImage : 'https://job-solutions-server.onrender.com/images/default.webp'}
                                        className="rounded-circle" alt="Avatar" style={{ width: '80px', height: '80px' }} />
                                    &nbsp;<Link to={`/changeProfilImage/${userDetails._id}`}><BsPencilSquare style={{ width: '20px', height: 'auto' }} title="Change Profile" /></Link>
                                </td>
                                <td>{userDetails.firstName && userDetails.firstName + " " + userDetails.lastName}</td>
                            </tr>
                            <tr>
                                <td><b>Job Title</b></td>
                                <td>{userDetails.jobTitle}</td>
                            </tr>
                            <tr>
                                <td><b>Qualification</b></td>
                                <td>{userDetails.qualification}</td>
                            </tr>
                            <tr>
                                <td><b>Experience</b></td>
                                <td>{userDetails.experience}</td>
                            </tr>
                            <tr>
                                <td><b>More Details</b></td>
                                <td>{userDetails.details}</td>
                            </tr>
                            <tr>
                                <td>Contact Number</td>
                                <td>{userDetails.contactNumber}</td>
                            </tr>
                            <tr>
                                <td><b>Resume</b></td>
                                <td>
                                    <a href={`https://job-solutions-server.onrender.com/resume/${userDetails.resume}`} target="_blank">View Resume</a>
                                </td>
                            </tr>
                        </table>
                        <Link to="/empProfile/updateProfile"><Button variant="primary" type="submit">
                            Update Details
                        </Button>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </>
    )
}

export default EmpProfileDetails;