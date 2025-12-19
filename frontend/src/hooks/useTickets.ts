import { QUERY_KEY } from "@/constants/query-key";
import { getTicketByMatchId, getTickets } from "@/services/tickets";
import { useQuery } from "@tanstack/react-query";
import useSession from "./useSession";
import { ITicket } from "@/interfaces/ticket";

export interface ITicketList extends ITicket {
  tickets: [];
}

function useTickets(matchId?: number) {
  const { user } = useSession();

  return useQuery<ITicketList>({
    queryKey: [QUERY_KEY.TICKETS, user?.uid, matchId],
    queryFn: async () => {
      if (matchId) {
        return await getTicketByMatchId(user?.uid || "", matchId);
      } else {
        return await getTickets();
      }
    },
    enabled: !!user?.uid && !!matchId,
  });
}

export default useTickets;
