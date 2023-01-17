import React, { useEffect, useRef, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBTypography, MDBInputGroup } from "mdb-react-ui-kit";
  import '../../stylesheet/chatStyle.css';
import Header from '../../containers/common/Header';
import { useSelector } from 'react-redux';
import { userChats } from '../../apis/ChatRequests';
import Converstations from '../../containers/common/Converstations';
import Chatbox from '../../containers/common/Chatbox';
import { io } from 'socket.io-client';

function EmployerChat() {
  const user = useSelector((store) => store.allUsers.user);
  const [chats, setChats] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();
  useEffect(() => {
    const getChat = async () => {
      try {
          const {data} = await userChats(user._id);
          setChats(data);
      }catch(err) {
         //console.log(err);
      }
    }
    getChat();
  },[user._id])
  useEffect(() => {
    console.log('user added');
    socket.current = io('http://localhost:8800');
    socket.current.emit("new-user-add", user._id);
    socket.current.on('get-users', (users)=>{
      setOnlineUsers(users);
    });
},[user]);
  useEffect(() => {
    if(sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  },[sendMessage]);
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    });
  }, []);
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
    <MDBContainer fluid style={{ backgroundColor: "#CDC4F9" }} >
    <Header/>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard id="chat3" style={{ borderRadius: "15px"}}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                  <div className="p-3">
                    <MDBInputGroup className="rounded mb-3">
                      <input
                        className="form-control rounded"
                        placeholder="Search"
                        type="search"
                      />
                      <span
                        className="input-group-text border-0"
                        id="search-addon"
                      >
                        <MDBIcon fas icon="search" />
                      </span>
                    </MDBInputGroup>
                    <div className="overflow-auto pt-3 pe-3" style={{height:'70vh'}}>
                      <MDBTypography listUnStyled className="mb-0" style={{position: "relative",height:'300px'}}>
                        {chats &&
                          chats.map((chat)=> {
                            return (
                              <div onClick={()=>setCurrentChat(chat)}>
                                <Converstations data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}/>
                              </div>
                            )
                          })
                        }
                      </MDBTypography>
                      </div>
                  </div>
                </MDBCol>
                <MDBCol md="6" lg="7" xl="8">
                        <Chatbox chat={currentChat} currentUserId={user._id} setSendMessage={setSendMessage}
                                  receivedMessage={receivedMessage}/>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
  )
}

export default EmployerChat;