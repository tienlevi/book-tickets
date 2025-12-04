import { baseURL } from "@/constants";
import axios from "axios";

export const instance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: { "Content-Type": "application/json" },
});
