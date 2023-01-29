import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import ApplicationDetails from '../../pages/employer/ApplicationDetails';
import AppEmployeeProfile from '../../pages/employer/AppEmployeeProfile';
import AdminLogin from '../../pages/admin/AdminLogin';
import AdminHome from '../../pages/admin/AdminHome';
import JobManagement from '../../pages/admin/JobManagement';
import ChangeProfileImage from '../../pages/employee/ChangeProfileImage';
import PostDelete from '../../pages/employee/PostDelete';
import RemoveJob from '../../pages/employer/RemoveJob';
import { useSelector } from 'react-redux';
import EmployeeDetails from '../../pages/admin/EmployeeDetails';
import EmployerDetails from '../../pages/admin/EmployerDetails';
import BlockConfirmation from '../../pages/admin/BlockConfirmation';
import EmprNotification from '../../pages/employer/EmprNotification';

function AllRoutes() {
  const user = useSelector((store) => store.allUsers.user);
  const admin = useSelector((store) => store.admin.user);
  const userToken = localStorage.getItem('empToken');
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />}></Route>
      {!userToken && <><Route path="/signin" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route></>}
      {user && user.userType === 'Job Seeker' &&
        <>
          (<Route path="/posts" element={<Posts />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/empProfile/updateProfile" element={<EmpProfileUpdate />}></Route>
          <Route path="/changeProfilImage/:id" element={<ChangeProfileImage />}></Route>
          <Route path="/deletePost/:id" element={<PostDelete />}></Route>)
        </>
      }
      {user && user.userType === 'Job Provider' &&
        <>
          <Route path="/postJob" element={<PostJob />}></Route>
          <Route path="/emprProfile/updateProfile" element={<ProfileUpdate />}></Route>
          <Route path="/jobApplications/:jobId" element={<ApplicationDetails />}></Route>
          <Route path="/appliedEmployeeProfile/:empId" element={<AppEmployeeProfile />}></Route>
          <Route path="/deleteJob/:id" element={<RemoveJob />}></Route>
          <Route path="/notification" element={<EmprNotification />}></Route>
        </>}

      {user && user.userType !== 'admin' &&
        <>
          <Route path="/empProfile" element={<EmpProfile />}></Route>
          <Route path="/chat" element={<EmployerChat />}></Route>
        </>}
      {admin && admin.userType === 'admin' &&
        <>
          <Route path="/admin/dashboard" element={<AdminHome />}></Route>
          <Route path="/admin/jobManagement" element={<JobManagement />}></Route>
          <Route path="/admin/empList" element={<EmployeeDetails />}></Route>
          <Route path="/admin/emprList" element={<EmployerDetails />}></Route>
          <Route path="/admin/blockConfirmation/:userId/:status" element={<BlockConfirmation />}></Route>
        </>}
      {userToken ? <Route path="*" element={<EmpProfile />}></Route> :
        <Route path="*" element={<Login />}></Route>
      }
    </Routes>
  )
}

export default AllRoutes;