import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://job-solutions-server.onrender.com'
  //http://localhost:8000
});

export const url = 'https://job-portal-gwu4.onrender.com';
//http://localhost:3000
export const socketUrl = 'https://job-solutions-socket.onrender.com';
//http://localhost:8800