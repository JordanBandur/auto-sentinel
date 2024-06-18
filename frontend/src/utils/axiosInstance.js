import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // Adjust this URL if needed
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;