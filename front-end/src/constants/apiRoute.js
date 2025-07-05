export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8888";

const API_URL = "/api/v1";

export const URLS = {
  REGISTER: API_URL + "/users/register",
  LOGIN: API_URL + "/users/login",
  EXPENSE: API_URL + "/add-expense",
  ADD_INCOME: API_URL + "/add-income",
  GET_BALANCE: API_URL + "/get-balance",
  GET_DASHBOARD: API_URL + "/dashboard-summary",
};
