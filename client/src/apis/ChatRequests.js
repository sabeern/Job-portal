import { instance } from './JobSolutionApi';
const token = localStorage.getItem('empToken');
const headers = { 'X-Custom-Header': `${token}` }
export const createChat = (senderId, receiverId) => instance.post('/chat', { senderId, receiverId }, { headers });
export const userChats = (userId) => instance.get(`/chat/${userId}`, { headers });
export const getUser = (userId) => instance.get(`/chat/user/${userId}`, { headers });
export const getMessages = (Id) => instance.get(`/message/${Id}`, { headers });
export const addMessage = (data) => instance.post('/message/', data, { headers });
