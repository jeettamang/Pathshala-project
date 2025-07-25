import axios from "axios";
import { BASE_URL } from "../constants/apiRoute";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  timeoutErrorMessage: "API Fetching time out",
});
console.log("BASE_URL", BASE_URL);
export default instance;
