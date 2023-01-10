import axios from 'axios';

const token = localStorage.getItem('empToken');
export const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {'X-Custom-Header': `${token}`}
  });