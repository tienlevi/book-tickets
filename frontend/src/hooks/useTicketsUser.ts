import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useSession from "./useSession";
import { QUERY_KEY } from "@/constants/query-key";
import { getTicketsByUser } from "@/services/tickets";
import { ITicket } from "@/interfaces/ticket";

interface ITicketsUser {
  uid: string;
  tickets: ITicket[];
  cursor: string;
}

export function useTicketsUserParams() {
  const { user } = useSession();

  return useInfiniteQuery<ITicketsUser>({
    queryKey: [QUERY_KEY.TICKETS, user?.uid],
    queryFn: async ({ pageParam = "0" }) => {
      return await getTicketsByUser(user?.uid || "", pageParam as string);
    },
    initialPageParam: "0",
    getNextPageParam: (lastPage) => {
      if (!lastPage.cursor || lastPage.cursor === "0") {
        return undefined;
      }
      return lastPage.cursor;
    },
    enabled: !!user,
  });
}

export function useTicketsUser() {
  const { user } = useSession();

  return useQuery<ITicket[]>({
    queryKey: [QUERY_KEY.TICKETS, QUERY_KEY.USERS, user?.uid],
    queryFn: async () => {
      const response = await getTicketsByUser(user?.uid || "");
      return response.tickets;
    },
    enabled: !!user,
  });
}
