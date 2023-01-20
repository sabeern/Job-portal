import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../apis/JobSolutionApi';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../common/Loader';

function ProfilePicModal({ data }) {
    const empId = useParams();
    const [selectedImage, setSelectedImage] = useState();
    const [loading, setLoading] = useState();
    const [err, setErr] = useState();
    const [profile, setProfile] = useState();
    const user = useSelector((store) => store.allUsers.user);
    const changeProfilePic = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", "Jobsolutions");
        formData.append("cloud_name", "dyff453oq");
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dyff453oq/image/upload", formData);
            const postImage = res.data.secure_url;
            const postData = { empId: empId.id, postImage }
            try {
                const token = localStorage.getItem('empToken');
                const headers = { 'X-Custom-Header': `${token}` };
                await instance.put('/user/profileImageUpdate', postData, { headers: headers });
                navigate('/empProfile');
            } catch (err) {
                setErr('Profile image update failed');
            }
        } catch (err) {
            setErr('Profile image update failed');
        }
        setLoading(false);
    }
    const navigate = useNavigate();
    useEffect(() => {
        setProfile(user.profileImage);
    }, [user]);
    return (
        <>
            {loading && <Loader />}
            <Modal show={data.show} onHide={() => navigate('/empProfile')}>
                <Modal.Header closeButton>
                    <Modal.Title>Please Select New Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!selectedImage && <img src={profile ? profile : 'http://localhost:8000/images/default.webp'}
                        className="rounded-circle" alt="Avatar" style={{ width: '120px', height: '120px', marginLeft: '25vh' }} />}
                    {selectedImage && <img src={URL.createObjectURL(selectedImage)}
                        className="rounded-circle" alt="Avatar" style={{ width: '120px', height: '120px', marginLeft: '25vh' }} />}
                    {err && <Alert variant='danger' className='mb-4 w-100'>
                        {err}
                    </Alert>}
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select Profile Image</Form.Label>
                        <Form.Control type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate('/empProfile')}>
                        Cancel
                    </Button>
                    {selectedImage && <Button variant="primary" onClick={changeProfilePic}>
                        Update
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProfilePicModal;
