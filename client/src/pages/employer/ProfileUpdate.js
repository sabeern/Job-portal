import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../containers/common/Header';
import { instance } from '../../apis/JobSolutionApi';
import { setUser } from '../../redux/actions/UserAction';
import CompanyProfileForm from '../../containers/employer/CompanyProfileForm';
import { useNavigate } from 'react-router-dom';
import Loader from '../../containers/common/Loader';
import axios from 'axios';

function ProfileUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const userDetails = useSelector((store) => store.allUsers);
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "", companyLocation: "", profileImage: ""
  });
  useEffect(() => {
    const profileDetails = {
      companyName: userDetails.user.companyName,
      companyLocation: userDetails.user.companyLocation,
      profileImage: userDetails.user.profileImage
    }
    setCompanyDetails(profileDetails);
  }, []);
  const [image, setImage] = useState();
  const handleEmployerChange = ({ currentTarget: input }) => {
    setCompanyDetails({ ...companyDetails, [input.name]: input.value });
  }
  const handlePhoto = (e) => {
    setImage(e.target.files[0]);
  }
  async function HandleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let companyName = companyDetails.companyName;
    if (!companyName) {
      setErr('Company name required');
      setLoading(false);
      return;
    }
    let companyLocation = companyDetails.companyLocation;
    if (!companyLocation) {
      setErr('Company location required');
      setLoading(false);
      return;
    }
    if (!image) {
      try {
        const token = localStorage.getItem('empToken');
        const headers = { 'X-Custom-Header': `${token}` }
        const data = await instance.post('/user/addCompanyDetails', { ...companyDetails, postImage: false }, { headers: headers });
        dispatch(setUser(data.data));
        navigate('/empProfile');
      } catch (err) {
        setErr(err.response.data.errMsg);
      }
      setLoading(false);
      return;
    }
    const imageCheck = image.name.split('.');
    const imageExtention = imageCheck[imageCheck.length - 1];
    if (imageExtention !== 'jpg' && imageExtention !== 'jpeg' && imageExtention !== 'png' && imageExtention !== 'webp') {
      setErr('Only jpg/png/webp allowed');
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Jobsolutions");
    formData.append("cloud_name", "dyff453oq");
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dyff453oq/image/upload", formData);
      const postImage = res.data.secure_url;
      try {
        const token = localStorage.getItem('empToken');
        const headers = { 'X-Custom-Header': `${token}` }
        const data = await instance.post('/user/addCompanyDetails', { ...companyDetails, postImage }, { headers: headers });
        dispatch(setUser(data.data));
        navigate('/empProfile');
      } catch (err) {
        setErr(err.response.data.errMsg);
      }
    } catch (err) {
      setErr('File upload failed');
    }
    setLoading(false);
  }
  return (
    <>
      {loading && <Loader />}
      <Header />
      <Container >
        <Row>
          <Col md={3}></Col>
          <Col md={6}><CompanyProfileForm data={{ companyDetails, handleEmployerChange, handlePhoto, HandleSubmit, err }} /></Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  )
}

export default ProfileUpdate;