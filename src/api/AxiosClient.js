import axios from 'axios';
import queryString from 'query-string';
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API || "http://localhost:8080/api",
    timeout: 20000,
    headers: {
    'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
    return response.data;
}
return response;
}, (error) => {
// Handle errors
    console.log(error)
    //  throw error;
});
export default axiosClient;
