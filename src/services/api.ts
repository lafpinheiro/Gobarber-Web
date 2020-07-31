import axios from 'axios';

const api = axios.create({
  baseURL: 'http://braga-1:3333',
});

export default api;
