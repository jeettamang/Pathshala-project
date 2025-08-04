export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8888";

const API_URL = "/api/v1";

export const URLS = {
  //Auth
  REGISTER: API_URL + "/admin/register",
  LOGIN: API_URL + "/admin/login",

  //admin
  ADMIN_PROFILE: API_URL + "/admin/profile",
  ADMIN_VERIFY: API_URL + "/admin/verify",
  GET_COURSES: API_URL + "/courses/get-all",

  //Users
  ADD_USER: API_URL + "/users/create",
  USER_LIST: API_URL + "/users/get-all",
  USER_DETAIL: (id) => `${API_URL}/users/detail/${id}`,
  USER_EDIT: (id) => `${API_URL}/users/edit/${id}`,

  //Expenses category
  ADD_EXPENSE: API_URL + "/add-category",
  ADD_EXPENSE_CATEGORY: API_URL + "/expense/add-category",
  GET_EXPENSE_CATEGORIES: API_URL + "/expense/all-categories",
  DEL_EXPENSE_CATEGORY: (id) => `${API_URL}/expense/delete-category/${id}`,

  //incomes
  ADD_INCOME: API_URL + "/add-income",
  ADD_INCOME_CATEGORY: API_URL + "/income/add-category",
  GET_INCOME_CATEGORIES: API_URL + "/income/all-categories",
  DEL_INCOME_CATEGORY: (id) => `${API_URL}/expense/delete/${id}`,

  GET_BALANCE: API_URL + "/get-balance",
  GET_DASHBOARD: API_URL + "/dashboard-summary",

  //course
  COURSE_CATEGORY: API_URL + "/course/add-category",
  GET_COURSE_CATEGORIES: API_URL + "/course/all-categories",
  DEL_COURSE: (id) => `${API_URL}/course/del-category/${id}`,
};
