import axios from './customize-axios';

const fetchAllUser = (pages) => {
    return axios.get(`/api/users?page=${pages}`)
}

const postCreateUser = (name, job) => {
    return axios.post(`/api/users`, { name, job })
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export { fetchAllUser, postCreateUser };