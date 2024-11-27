import axios from "axios";
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Your user token
        if (token) {
            config.headers.authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// export const authorization = {
//     headers: {
//          'authorization': token
//         }
//     }

export default axiosInstance;