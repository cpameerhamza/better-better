import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    // timeout: 5000,
    headers: {
        // "Content-Type": "application/json"
        "Content-Type": "multipart/form-data"
    }
});

// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
    // document.getElementById("c-loader").style.display = "block"
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // document.getElementById("c-loader").style.display = "none"

    return response.data;
}, function (error) {
    // document.getElementById("c-loader").style.display = "none"
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("Something went wrong.", error)
    return Promise.reject(error);
});


export default api