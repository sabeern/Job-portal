import React, {useState, useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../containers/common/Header';
import { instance } from '../../apis/JobSolutionApi';
import { setUser } from '../../redux/actions/UserAction';
import CompanyProfileForm from '../../containers/employer/CompanyProfileForm';
import { useNavigate } from 'react-router-dom';

function ProfileUpdate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDetails = useSelector((store)=> store.allUsers);
    const [companyDetails,setCompanyDetails] = useState({
        companyName : "",
        companyLocation : "",
        profileImage : ""
      });
    useEffect(() => {
      const profileDetails = {companyName : userDetails.user.companyName,
        companyLocation : userDetails.user.companyLocation,
        profileImage : userDetails.user.profileImage}
      setCompanyDetails(profileDetails);
    },[]);
  const [image, setImage] = useState();
  const handleEmployerChange = ({currentTarget : input}) => {
      setCompanyDetails({...companyDetails, [input.name]:input.value});
  }
  const handlePhoto = (e) => {
    setImage(e.target.files[0]);
  }
  async function HandleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('photo',image);
      formData.append('companyDetails',JSON.stringify(companyDetails));
    //   const token = localStorage.getItem("empToken");
    //   const instance = axios.create({
    //   baseURL: 'http://localhost:8000',
    //   headers: {'X-Custom-Header': `${token}`}
    // }); 
    try {
      const data = await instance.post('/user/addCompanyDetails',formData);
      dispatch(setUser(data.data));
      navigate('/empProfile');
    }catch(err) {
      console.log(err);
    }
  }
  return (
    <>
        <Header />
        <Container >
          <Row>
            <Col md={3}></Col>
            <Col md={6}><CompanyProfileForm data={{ companyDetails, handleEmployerChange, handlePhoto, HandleSubmit }}/></Col>
            <Col md={3}></Col>
          </Row>
        </Container>
    </>
  )
}

export default ProfileUpdate;