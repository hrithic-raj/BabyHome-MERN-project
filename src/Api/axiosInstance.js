import axios from "axios";
const token = localStorage.getItem('token')
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

export const authorization = {headers: { 'authorization': token}}

export default axiosInstance;