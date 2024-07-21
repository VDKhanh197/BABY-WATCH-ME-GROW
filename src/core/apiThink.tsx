import axios from "axios";
const apiThink = axios.create({
  baseURL: "https://thinkdiff.us",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'
   
  },
  // withCredentials: true,
});

apiThink.interceptors.response.use(
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
export default apiThink;
