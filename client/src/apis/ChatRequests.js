import axios from 'axios';
import { instance } from './JobSolutionApi';

export const userChats = (userId) => instance.get(`/chat/${userId}`);
export const getUser = (userId) => instance.get(`/chat/user/${userId}`);
export const getMessages = (Id) => instance.get(`/message/${Id}`);
export const addMessage = (data) => instance.post('/message/',data);
