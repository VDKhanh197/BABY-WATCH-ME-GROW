import axios from "axios";
const apiAuth = axios.create({
  baseURL: "https://api.funface.online",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'
   
  },
  // withCredentials: true,
});

apiAuth.interceptors.response.use(
  (response) => {
    console.log("here");
    const token = localStorage.getItem("accessToken");
    if (token) {
      response.headers.Authorization = `Bearer ${token}`;
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default apiAuth;
