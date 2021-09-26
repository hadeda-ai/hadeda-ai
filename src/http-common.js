import axios from "axios";

export default axios.create({
  // Dev environment
  // baseURL: "http://localhost:8000/",
  // Demo environment
  baseURL: "https://chakra-server.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});
