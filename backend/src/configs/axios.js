import { sofascoreBase } from "../constants/index.js";
import axios from "axios";

export const sofascoreApi = axios.create({
  baseURL: sofascoreBase,
  headers: {
    "Content-Type": "application/json",
  },
});
