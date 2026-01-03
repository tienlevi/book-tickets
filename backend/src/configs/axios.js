import { sofascoreBase } from "../constants/index.js";
import axios from "axios";

export const sofascoreApi = axios.create({
  baseURL: sofascoreBase,
  headers: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
});
