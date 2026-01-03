import { instance } from "@/configs/axios";
import { ITicket } from "@/interfaces/ticket";

export const getTickets = async () => {
  const response = await instance.get(`/tickets`);
  return response.data;
};

export const getTicketByMatchId = async (uid: string, matchId: number) => {
  const response = await instance.get(`/ticket/${uid}/match/${matchId}`);
  return response.data;
};

export const getTicketsByUser = async (uid: string) => {
  const response = await instance.get(`/ticket/${uid}`);
  return response.data;
};

export const bookTicket = async (data: ITicket) => {
  const response = await instance.post(`/ticket`, data);
  return response.data;
};

export const cancelTicket = async (uid: string, matchId: number) => {
  const response = await instance.delete(`/ticket/${uid}/match/${matchId}`);
  return response.data;
};
