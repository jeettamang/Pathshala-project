export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8888";

const API_URL = "/api/v1";

export const URLS = {
  REGISTER: API_URL + "/users/register",
  LOGIN: API_URL + "/users/login",
  EXPENSE: API_URL + "/expense",
};
