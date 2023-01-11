import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { instance } from '../../apis/JobSolutionApi';
import { setEmployeePosts } from '../../redux/actions/UserAction';

function AddPostModal({data}) {
    const [selectedImage, setSelectedImage] = useState();
    const [post,setPost] = useState();
    const dispatch = useDispatch();
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
        }
      };
      const removeSelectedImage = () => {
        setSelectedImage();
      };
      const setData = (e) => {
        setPost(e.target.value);
      }
      useEffect(() => {
        setSelectedImage();
      },[data.show]);
      const handlePost = async () => {
            const formData = new FormData();
            formData.append("file",selectedImage);
            formData.append("upload_preset","Jobsolutions");
            formData.append("cloud_name","dyff453oq");
            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/dyff453oq/image/upload", formData);
                const postImage = res.data.secure_url;
                const postData = {postDescription : post,postImage}
                try {
                    const token = localStorage.getItem('empToken');
                    const headers = {'X-Custom-Header': `${token}`};
                    await instance.post('/post/addPost', postData, {headers : headers});
                    setSelectedImage();
                    dispatch(setEmployeePosts());
                    data.handleClose();
                }catch(err) {
                    console.log(err);
                }
            }catch(err) {
                console.log('Upload failed');
            }
      }
  return (
        <Modal show={data.show} onHide={data.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control as="textarea" rows={2} onChange={setData}/>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Select Image</Form.Label>
                    <Form.Control type="file" onChange={imageChange}/>
                </Form.Group>
                {selectedImage && (
                    <div >
                        <img src={URL.createObjectURL(selectedImage)} style={{maxWidth:'100%',height:'auto'}}
                                    accept="image/*" alt="Post Image"/>
                        <button onClick={removeSelectedImage} style={{cursor: "pointer", padding: 15,
                                    background: "red", color: "white", border: "none",width:'100%'}}>
                                Remove This Image
                        </button>
                    </div>
        )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={data.handleClose}>
                        Close
                </Button>
                <Button variant="primary" onClick={handlePost} >
                        Post
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default AddPostModal;