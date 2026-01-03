import { useQuery } from "@tanstack/react-query";
import useSession from "./useSession";
import { QUERY_KEY } from "@/constants/query-key";
import { getTicketsByUser } from "@/services/tickets";
import { ITicket } from "@/interfaces/ticket";

interface ITicketsUser {
  uid: string;
  tickets: ITicket[];
  cursor: string;
}

function useTicketsUser() {
  const { user } = useSession();

  return useQuery<ITicketsUser>({
    queryKey: [QUERY_KEY.TICKETS, user?.uid],
    queryFn: async () => {
      return await getTicketsByUser(user?.uid || "");
    },
    enabled: !!user,
  });
}

export default useTicketsUser;
