import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../containers/common/Header';
import { instance } from '../../apis/JobSolutionApi';
import { setUser } from '../../redux/actions/UserAction';
import CompanyProfileForm from '../../containers/employer/CompanyProfileForm';
import { useNavigate } from 'react-router-dom';
import Loader from '../../containers/common/Loader';

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
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('companyDetails', JSON.stringify(companyDetails));
    try {
      const token = localStorage.getItem('empToken');
      const headers = { 'X-Custom-Header': `${token}` }
      const data = await instance.post('/user/addCompanyDetails', formData, { headers: headers });
      dispatch(setUser(data.data));
      navigate('/empProfile');
    } catch (err) {
      setErr(err.response.data.errMsg);
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