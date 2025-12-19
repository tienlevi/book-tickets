import { instance } from "@/configs/axios";
import { ITicket } from "@/interfaces/ticket";

export const bookTicket = async (data: ITicket) => {
  const response = await instance.post(`/ticket`, data);
  return response.data;
};

export const getTicketByMatchId = async (matchId: number) => {
  const response = await instance.post(`/ticket`);
  return response.data;
};
