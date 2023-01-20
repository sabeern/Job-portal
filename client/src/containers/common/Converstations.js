import React, { useEffect, useState } from 'react';
import { getUser } from '../../apis/ChatRequests';

function Converstations({ data, currentUserId, online }) {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const otherUserId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(otherUserId);
        setUserData(data.userDetails);
      } catch (err) {
        //console.log(err);
      }
    }
    getUserData();
  }, []);

  return (
    <>
      <li className="p-2 border-bottom">
        <span
          className="d-flex justify-content-between"
        >
          <div className="d-flex flex-row">
            <div>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="avatar"
                className="d-flex align-self-center me-3"
                width="60"
              />
              <span className="badge bg-success badge-dot"></span>
            </div>
            <div className="pt-1">
              <p className="fw-bold mb-0">{userData && (userData.companyName ? userData.companyName : (userData.firstName + " " + userData.lastName))}</p>
              <p className="small text-muted">
                {online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </span>
      </li>
    </>
  )
}

export default Converstations;