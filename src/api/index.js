import axios from "axios";

const API = axios.create({
  baseURL: "https://tracking.bosta.co"
});

export default API;
