import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInputbox from '../../components/FormInputbox';
import { instance } from '../../apis/JobSolutionApi';
import { setUser } from '../../redux/actions/UserAction';
import Loader from '../common/Loader';
import axios from 'axios';

function EmpProfileForm() {
    const userDetails = useSelector((store) => store.allUsers.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState();
    const [employeeDetails, setEmployeeDetails] = useState({
        firstName: "",
        lastName: "",
        jobTitle: "",
        qualification: "",
        experience: "",
        moreDetails: "",
        contactNumber: ""
    });
    const [resume, setResume] = useState();
    useEffect(() => {
        setEmployeeDetails({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            jobTitle: userDetails.jobTitle,
            qualification: userDetails.qualification,
            experience: userDetails.experience,
            moreDetails: userDetails.details,
            contactNumber: userDetails.contactNumber
        });
    }, []);
    const handleChange = ({ currentTarget: input }) => {
        setEmployeeDetails({ ...employeeDetails, [input.name]: input.value });
    }
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let firstName = employeeDetails.firstName;
        if (!firstName) {
            setErr('Firstname required');
            setLoading(false);
            return;
        }
        let jobTitle = employeeDetails.jobTitle;
        if (!jobTitle) {
            setErr('Job title required');
            setLoading(false);
            return;
        }
        let qualification = employeeDetails.qualification;
        if (!qualification) {
            setErr('Qualification required');
            setLoading(false);
            return;
        }
        let experience = employeeDetails.experience;
        if (!experience) {
            setErr('Experience required');
            setLoading(false);
            return;
        }
        let contactNumber = employeeDetails.contactNumber;
        if (contactNumber) {
            var checkString = /^\d{10}$/;
            if (!contactNumber.match(checkString)) {
                setErr('Enter valid contact number');
                setLoading(false);
                return;
            }
        } else {
            setErr('Contact number required');
            setLoading(false);
            return;
        }
        if (!resume) {
            try {
                const token = localStorage.getItem('empToken');
                const headers = { 'X-Custom-Header': `${token}` };
                await instance.post('/user/addEmployeeDetails', { ...employeeDetails, resume: false }, { headers: headers });
                dispatch(setUser());
                navigate('/empProfile');
            } catch (err) {
                setErr(err.response.data.errMsg);
            }
            setLoading(false);
            return
        }
        const resumeCheck = resume.name.split('.');
        const resumeExtention = resumeCheck[resumeCheck.length - 1];
        if (resumeExtention !== 'pdf') {
            setErr('Only pdf allowed');
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append("file", resume);
        formData.append("upload_preset", "Jobsolutions");
        formData.append("cloud_name", "dyff453oq");
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dyff453oq/image/upload", formData);
            const resumeLink = res.data.secure_url;
            try {
                const token = localStorage.getItem('empToken');
                const headers = { 'X-Custom-Header': `${token}` };
                await instance.post('/user/addEmployeeDetails', { ...employeeDetails, resume: resumeLink }, { headers: headers });
                dispatch(setUser());
                navigate('/empProfile');
            } catch (err) {
                setErr(err.response.data.errMsg);
            }
        } catch (err) {
            setErr('Resume upload failed');
        }
        setLoading(false);
    }
    const handleFile = (e) => {
        setResume(e.target.files[0]);
    }
    return (
        <>
            {loading && <Loader />}
            <Col md={12} className="mb-5">
                <h1 className='mt-4'>Profile Information</h1>
                <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <Row>
                        {err && <Alert variant='danger' className='mb-4 w-100'>
                            {err}
                        </Alert>}
                        <Col md={6}>
                            <FormInputbox data={{ type: "text", placeholder: "First name", label: "First Name", value: employeeDetails.firstName, name: 'firstName', handleChange: handleChange, disabled: false, class: "mb-3 mt-3" }} />
                        </Col>
                        <Col md={6}>
                            <FormInputbox data={{ type: "text", placeholder: "Last name", label: "Last Name", value: employeeDetails.lastName, name: 'lastName', handleChange: handleChange, disabled: false, class: "mb-3 mt-3" }} />
                        </Col>
                    </Row>
                    <FormInputbox data={{ type: "text", placeholder: "Job title", label: "Job Title", value: employeeDetails.jobTitle, name: 'jobTitle', handleChange: handleChange, disabled: false, class: "mb-3" }} />
                    <FormInputbox data={{ type: "text", placeholder: "Qualifications", label: "Qualifications", value: employeeDetails.qualification, name: 'qualification', handleChange: handleChange, disabled: false, class: "mb-3" }} />
                    <FormInputbox data={{ type: "text", placeholder: "Experience", label: "Experience", value: employeeDetails.experience, name: 'experience', handleChange: handleChange, disabled: false, class: "mb-3" }} />
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>More Details</Form.Label>
                        <Form.Control as="textarea" rows={3} value={employeeDetails.moreDetails} onChange={handleChange} name='moreDetails' />
                    </Form.Group>
                    <FormInputbox data={{ type: "number", placeholder: "Contact number", label: "Contact Number", value: employeeDetails.contactNumber, name: 'contactNumber', handleChange: handleChange, disabled: false, class: "mb-3" }} />
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Resume</Form.Label>
                        <Form.Control type="file" name='employeeResume' onChange={handleFile} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Details
                    </Button>
                </Form>
            </Col>
        </>
    )
}

export default EmpProfileForm;