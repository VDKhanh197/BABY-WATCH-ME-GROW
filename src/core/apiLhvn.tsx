import axios from "axios";
const apiLhvn = axios.create({
  // baseURL: "https://api.mangasocial.online",
  baseURL: "https://videoswap.mangasocial.online",

  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'
   
  },
  // withCredentials: true,
});

apiLhvn.interceptors.response.use(
  (response) => {
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
export default apiLhvn;
