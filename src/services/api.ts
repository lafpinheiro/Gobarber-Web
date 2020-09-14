import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://braga-1:3333',
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
