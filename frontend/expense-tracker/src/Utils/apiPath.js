export const BASE_URL = "http://localhost:8000";

const API_PATHS = {
  Auth: {
    LOGIN: "api/v1/auth/login",
    REGISTER: "api/v1/auth/register",
    GET_USER_INFO: "api/v1/auth/getUser",
  },
  DASHBOARD:{
    GET_DATA: "api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (id) => `api/v1/income/delete/${id}`,
    DOWNLOAD_EXPENSE: "api/v1/income/downloadexcel"
  },
  EXPENSE: {
    ADD_EXPENSE: "api/v1/expense/add",
    GET_ALL_EXPENSE: "api/v1/expense/get",
    DELETE_EXPENSE: (id) => `api/v1/expense/delete/${id}`,
    DOWNLOAD_EXPENSE: "api/v1/expense/downloadexcel"
  },
}

export default BASE_URL;
export { API_PATHS };