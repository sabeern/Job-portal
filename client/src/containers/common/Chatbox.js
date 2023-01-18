import React, { useEffect, useRef, useState } from 'react';
import { addMessage, getMessages, getUser } from '../../apis/ChatRequests';
import { format } from 'timeago.js';
import { BsFillCursorFill } from 'react-icons/bs';

function Chatbox({chat, currentUserId, setSendMessage, receivedMessage}) {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef()
    useEffect(()=> {
        const otherUserId = chat?.members?.find((id)=>id != currentUserId);
        const getUserData = async () => {
            try {
                const {data} = await getUser(otherUserId);
                setUserData(data.userDetails);
            }catch(err) {
                //console.log(err);
            }
        }
        if(chat) {
            getUserData();
        }
    },[chat, currentUserId]);
    useEffect(() => {
      if(receivedMessage !== null && receivedMessage.chatId === chat._id) {
        setMessages([...messages, receivedMessage]);
      }
    },[receivedMessage]);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const {data} = await getMessages(chat._id);
                //console.log(data);
                setMessages(data);
            }catch(err) {
                //console.log(err);
            }
        }
        if(chat) {
            fetchMessages();
        }
    },[chat]);
    const handleChange = (e) => {
        setNewMessage(e.target.value);
    }
    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
          senderId : currentUserId,
          text : newMessage,
          chatId : chat._id
        }
        //console.log(message);
        try {
            const {data} = await addMessage(message);
            setMessages([...messages,data]);
            setNewMessage("");
        }catch(err) {
          //console.log(err);
        }
        const receiverId = chat.members.find((id)=>id !== currentUserId);
        setSendMessage({...message, receiverId});
    }
    useEffect(() => {
      scroll.current?.scrollIntoView({behavior: "smooth"});
    },[messages])
  return (
    <>
    <div className="overflow-auto pt-3 pe-3" style={{height:'70vh'}}>
        {
            messages.map((message) => {
                return(
                    <div ref={scroll}>
                    {message.senderId !== currentUserId ? 
                    (<div className="d-flex flex-row justify-content-start">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-1 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          {message.text}
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                          {format(message.createdAt)}
                        </p>
                      </div>
                    </div>) :
                    (<div className="d-flex flex-row justify-content-end">
                      <div>
                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                        {message.text}
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                        {format(message.createdAt)}
                        </p>
                      </div>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                    </div>)

            }
                    </div>
                )
            })


        }
            </div>
            { chat ? 
                    (<div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 3"
                      style={{ width: "40px", height: "100%" }}
                    />
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleFormControlInput2"
                      placeholder="Type message"
                      onChange={handleChange} value={newMessage}
                    />
                    <span className="ms-3" onClick={handleSend}>
                      <BsFillCursorFill />
                    </span>
                  </div>) :
                  <p>Tap on chat to start to start converstations...</p> }
    </>
  )
}

export default Chatbox;