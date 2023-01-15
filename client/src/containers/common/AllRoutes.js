import React from 'react';
import {Routes, Route} from 'react-router-dom';
import EmpProfile from '../../pages/common/EmpProfile';
import Home from '../../pages/employee/Home';
import Login from '../../pages/common/Login';
import PostJob from '../../pages/employer/PostJob';
import Posts from '../../pages/employee/Posts';
import Signup from '../../pages/common/Signup';
import ProfileUpdate from '../../pages/employer/ProfileUpdate';
import EmpProfileUpdate from '../../pages/employee/EmpProfileUpdate';
import ForgotPassword from '../../pages/common/ForgotPassword';
import EmployerChat from '../../pages/employer/EmployerChat';
import Test from '../../pages/common/Test';
import ApplicationDetails from '../../pages/employer/ApplicationDetails';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signin" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/posts" element={<Posts />}></Route>
      <Route path="/empProfile" element={<EmpProfile />}></Route>
      <Route path="/postJob" element={<PostJob />}></Route>
      <Route path="/emprProfile/updateProfile" element={<ProfileUpdate />}></Route>
      <Route path="/empProfile/updateProfile" element={<EmpProfileUpdate />}></Route>
      <Route path="/chat" element={<EmployerChat />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/test" element={<Test />}></Route>
      <Route path="/jobApplications/:jobId" element={<ApplicationDetails />}></Route>
    </Routes>
  )
}

export default AllRoutes;