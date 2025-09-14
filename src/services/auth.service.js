import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const login = (data, onResult) => {
  return axios
    .post("https://fakestoreapi.com/auth/login", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      if(onResult) onResult(true, response.data.token)
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      if(onResult) onResult(false, err)
      throw err;
    });
};

export const getUsername = (token) => {
  const decoded  = jwtDecode(token)
  return decoded.user
}


