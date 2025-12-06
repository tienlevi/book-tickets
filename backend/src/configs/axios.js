import { sofascoreBase } from "../constants/index.js";
import axios from "axios";

export const sofascoreApi = axios.create({
  baseURL: sofascoreBase,
  headers: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    Referer: "https://www.sofascore.com/",
    Origin: "https://www.sofascore.com",
  },
});
