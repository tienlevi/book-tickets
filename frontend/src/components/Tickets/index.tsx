import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { QUERY_KEY } from "@/constants/query-key";
import useTicketsUser from "@/hooks/useTicketsUser";
import { IMatchDetail } from "@/interfaces/match";
import { getMatchById } from "@/services/matches";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import Teams from "./Teams";
import Info from "./Info";

function Tickets() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTicketsUser();

  const { data: tickets, isLoading: isLoadingTicket } = useQuery<
    IMatchDetail[]
  >({
    queryKey: [QUERY_KEY.MATCHES, data?.pages],
    queryFn: async () => {
      const allTickets = data?.pages.flatMap((page) => page.tickets) || [];
      const ticketsDetails = await Promise.all(
        allTickets.map((t) => getMatchById(t.matchId)),
      );
      return ticketsDetails;
    },
    enabled: !!data?.pages,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="md:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>My Tickets</CardTitle>
          <CardDescription>
            Here are the tickets you have booked.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 overflow-auto h-[600px]">
            {isLoadingTicket ? (
              <Spinner />
            ) : tickets?.length === 0 ? (
              <p className="text-center text-gray-500">No tickets found.</p>
            ) : (
              tickets?.map((ticket) => (
                <div
                  key={ticket.event.id}
                  className="border rounded-xl p-4 flex flex-col gap-3"
                >
                  <Teams ticket={ticket} />
                  <Info ticket={ticket} />
                </div>
              ))
            )}
          </div>
          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              className="cursor-pointer mt-4 w-full"
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Tickets;
