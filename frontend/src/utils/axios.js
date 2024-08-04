import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1000/api/v1' ,
  withCredentials: true
//   ,
//   withCredentials: true,
});

export default instance;
