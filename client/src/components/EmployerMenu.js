import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { instance } from '../apis/JobSolutionApi';

function EmployerMenu() {
  const [notficationCount, setNotificationCount] = useState();
  const user = useSelector((store)=>store.allUsers.user);
  useEffect(() => {
    instance.get('jobs/notificationCount/'+user._id).then((res)=> {
      setNotificationCount(res.data.notCount);
    }).catch((err) => {

    });
  },[]);
  return (
    <>
      <Link to="/empProfile" className='nav-link'>Dashboard</Link>
      <Link to="/postJob" className='nav-link'>Post Job</Link>
      <Link to="/notification" className='nav-link'>Notifications
          <span style={{background:'red',borderRadius:'50%',padding:'2px 5px'}}>{notficationCount}</span>
      </Link>
      <Link to="/chat" target="_blank" className='nav-link'>Chats</Link>
    </>
  )
}

export default EmployerMenu;