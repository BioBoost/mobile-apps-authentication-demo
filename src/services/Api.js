import axios from "axios";

export default () => {
  let api = axios.create({
    baseURL: `http://localhost:8081`,
    withCredentials: true   // Automatically send cookies along
  });

  return api
};
