import { instance } from "@/configs/axios";

export const getUser = async (token: string) => {
  const response = await instance.get("/user");
};
