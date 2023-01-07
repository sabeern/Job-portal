import React, { useState} from 'react';
import Header from '../containers/Header';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EachPost from '../containers/EachPost';
import { Link } from 'react-router-dom';
import AddPostModal from '../containers/AddPostModal';
import EmpProfileForm from '../containers/EmpProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import CompanyProfileForm from '../containers/CompanyProfileForm';
import CompanyDashboard from '../containers/CompanyDashboard';
import axios from 'axios';
import { setUser } from '../redux/actions/UserAction';

function EmpProfile() {
    const dispatch = useDispatch();
    let userDetails = useSelector((store)=> store.allUsers);
    if(!userDetails.user) {
      userDetails = {user:{userType:false}};
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [companyDetails,setCompanyDetails] = useState({
        companyName : "",
        companyLocation : "",
        profileImage : ""
      });
    //const [jobs,setJobs] = useState([]);
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
      const token = localStorage.getItem("empToken");
      const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {'X-Custom-Header': `${token}`}
    }); 
    try {
      const data = await instance.post('/user/addCompanyDetails',formData); 
      dispatch(setUser(data.data));
      const profileDetails = {companyName : userDetails.user.companyName,
        companyLocation : userDetails.user.companyLocation,
        profileImage : userDetails.user.profileImage}
        profileDetails.profileImage = '';
      setCompanyDetails(profileDetails);
      //console.log(test);
    }catch(err) {
      console.log(err);
    }

}
  let employee = false;
  let employer = false;
  if(userDetails.user.userType === 'Job Seeker') {
    employee = true;
  } else if (userDetails.user.userType === 'Job Provider') {
    employer = true;
  }
  return (
      <>
        <Header />
        <Container>
            {employee && 
            <Row>
                <EmpProfileForm />
                <Col md={6} className="overflow-auto d-none d-md-block" style={{maxHeight:'80vh'}}>
                    <Link to="" className='float-end mt-3'><Button style={{background:'#14AED0'}} onClick={handleShow}>Add New Post</Button></Link>
                    <EachPost />
                    <EachPost />
                    <EachPost />
                </Col>
            </Row> }
            {
                employer && 
                <Row>
                    <CompanyProfileForm data={{ companyDetails, handleEmployerChange, handlePhoto, HandleSubmit }}/>
                    <Col md={8} className="overflow-auto" style={{maxHeight:'80vh'}}>
                    <Link to="/postJob" className='float-end mt-3'><Button style={{background:'#14AED0'}}>Post New Job</Button></Link>
                    <CompanyDashboard />
                </Col>
                </Row>
            }
        </Container>
        <AddPostModal data={{handleClose,show}}/>
    </>
  )
}

export default EmpProfile;