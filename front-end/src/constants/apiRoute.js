export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8888";

const API_URL = "/api/v1";

export const URLS = {
  REGISTER: API_URL + "/admin/register",
  LOGIN: API_URL + "/admin/login",
  ADD_USER: API_URL + "/users/create",
  USER_LIST: API_URL + "/users/get-all",
  EXPENSE: API_URL + "/add-expense",
  ADD_INCOME: API_URL + "/add-income",
  GET_BALANCE: API_URL + "/get-balance",
  GET_DASHBOARD: API_URL + "/dashboard-summary",
  ADMIN_VERIFY: API_URL + "/admin/verify",
  ADD_CATEGORY: API_URL + "/add-category",
  GET_CATEGORIES: API_URL + "/all-categories",
  DEL_CATEGORY: API_URL + "/del-category",
  ADMIN_PROFILE: API_URL + "/admin/profile",
};
