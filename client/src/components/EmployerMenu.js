import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { instance } from '../apis/JobSolutionApi';

function EmployerMenu() {
  const [notficationCount, setNotificationCount] = useState();
  const user = useSelector((store) => store.allUsers.user);
  useEffect(() => {
    const token = localStorage.getItem('empToken');
    const headers = { 'X-Custom-Header': `${token}` }
    instance.get('jobs/notificationCount/' + user._id, { headers }).then((res) => {
      setNotificationCount(res.data.notCount);
    }).catch((err) => {

    });
  }, []);
  return (
    <>
      <Link to="/empProfile" className='nav-link'>Dashboard</Link>
      <Link to="/postJob" className='nav-link'>Post Job</Link>
      <Link to="/notification" className='nav-link'>Notifications
        <span className="badge bg-danger rounded-pill float-end">{notficationCount}</span>
      </Link>
      <Link to="/chat" target="_blank" className='nav-link'>Chats</Link>
    </>
  )
}

export default EmployerMenu;