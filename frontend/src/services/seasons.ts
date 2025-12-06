import { instance } from "@/configs/axios";

export const getSeasons = async () => {
  try {
    const response = await instance.get(`/seasons`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
