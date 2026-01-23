import axios from 'axios';
import { authState as auth } from './store/auth';

// To define base settings for HTTP requests to the backend API
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${auth.token}`
  }
});