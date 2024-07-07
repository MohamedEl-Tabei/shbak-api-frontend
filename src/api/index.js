import Axios from "axios";
const baseURL = "https://shbak-api-backend.vercel.app/"; //"http://localhost:5000/"
const request = Axios.create({ baseURL });
const API = {
  request,
  baseURL,
};

export default API;
