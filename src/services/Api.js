import axios from "axios";

export default () => {
  let api = axios.create({
    baseURL: `http://localhost:8081`
  });
  return api
};