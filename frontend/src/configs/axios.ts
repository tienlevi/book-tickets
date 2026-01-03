import { baseURL, sofascoreURL } from "@/constants";
import axios from "axios";

export const instance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: { "Content-Type": "application/json" },
});

export const sofascoreApi = axios.create({
  baseURL: sofascoreURL,
  headers: {
    "Content-Type": "application/json",
  },
});
