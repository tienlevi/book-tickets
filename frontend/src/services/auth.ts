import { instance } from "@/configs/axios";

type LoginData = {
  idToken: string;
};

export const getAuth = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await instance.get("/auth", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await instance.post(
    "/login",
    {},
    {
      headers: { Authorization: `Bearer ${data.idToken}` },
    }
  );
  return response.data;
};
