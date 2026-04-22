import axios from "axios";
import EnvManager from "../../config/EnvManager";

export const apiClient = axios.create({
  baseURL: EnvManager.BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
