import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",  // or 5001 if you changed port
  baseURL: "https://time-table-generator-backend.onrender.com/api",
  withCredentials: true,
});

export default API;   // ✅ ensure this line exists
