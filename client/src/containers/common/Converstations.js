import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../apis/ChatRequests';
import { instance } from '../../apis/JobSolutionApi';

function Converstations({ data, currentUserId, online }) {
  const [userData, setUserData] = useState();
  const [unReadCount, setUnreadCount] = useState();
  const user = useSelector((store) => store.allUsers.user);
  useEffect(() => {
    const otherUserId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(otherUserId);
        setUserData(data.userDetails);
      } catch (err) {
      }
    }
    if (data) {
      const token = localStorage.getItem('empToken');
      const headers = { 'X-Custom-Header': `${token}` }
      instance.get(`/message/unreadCount/${data._id}/${user._id}`, { headers }).then((res) => {
        setUnreadCount(res.data);
      }).catch((err) => {
        setUnreadCount(0);
      })
    }
    getUserData();
  }, [data]);

  return (
    <>
      <li className="p-2 border-bottom">
        <span
          className="d-flex justify-content-between"
        >
          <div className="d-flex flex-row">
            <div>
              {userData &&
                <img src={userData && userData.profileImage ? userData.profileImage : 'https://job-solutions-server.onrender.com/images/default.webp'}
                  className="rounded-circle d-flex align-self-center me-3" alt="Avatar" style={{ width: '60px', height: '60px' }} />
              }
              <span className="badge bg-success badge-dot"></span>
            </div>
            <div className="pt-1">
              <p className="fw-bold mb-0">{userData && (userData.companyName ? userData.companyName : (userData.firstName + " " + userData.lastName))}</p>
              <p className="small text-muted">
                {online ? 'Online' : 'Offline'}&nbsp;&nbsp;
                {unReadCount !== 0 && <span className="badge bg-danger rounded-pill">
                  {unReadCount}
                </span>}
              </p>
            </div>
          </div>
        </span>
      </li>
    </>
  )
}

export default Converstations;