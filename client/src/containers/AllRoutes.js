import React from 'react';
import {Routes, Route} from 'react-router-dom';
import EmpProfile from '../pages/EmpProfile';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PostJob from '../pages/PostJob';
import Posts from '../pages/Posts';
import Signup from '../pages/Signup';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signin" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/posts" element={<Posts />}></Route>
      <Route path="/empProfile" element={<EmpProfile />}></Route>
      <Route path="/postJob" element={<PostJob />}></Route>
    </Routes>
  )
}

export default AllRoutes;