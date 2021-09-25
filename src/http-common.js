import axios from "axios";

export default axios.create({
  // Dev environment
  baseURL: "http://localhost:8000/",
  // Demo environment
  // baseURL: "https://team-chakra-thlta.herokuapp.com/",
  headers: {
    "Content-type": "application/x-www-form-urlencoded"
  }
});
