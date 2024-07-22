import axios from "axios";
import { LocalStorage } from "./LocalStorage";
const acc_tk = LocalStorage.getItem("acc_tk");

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + `${acc_tk}`,
  },
});
