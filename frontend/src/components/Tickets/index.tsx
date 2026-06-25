import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { QUERY_KEY } from "@/constants/query-key";
import { useTicketsUser, useTicketsUserParams } from "@/hooks/useTicketsUser";
import { IMatchDetail } from "@/interfaces/match";
import { getMatchById } from "@/services/matches";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import Teams from "./Teams";
import Info from "./Info";

function Tickets() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTicketsUserParams();

  const { data: tickets } = useTicketsUser();
  const { data: matches, isLoading: isLoadingTicket } = useQuery<
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

  const sortMatchesByTicket =
    matches?.sort((a, b) => {
      const tA = tickets?.find((t) => t.matchId === a.matchId)?.created_at ?? 0;
      const tB = tickets?.find((t) => t.matchId === b.matchId)?.created_at ?? 0;
      return tB - tA;
    }) || [];

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
          <div className="grid grid-cols-1 gap-4 overflow-auto h-150">
            {isLoadingTicket ? (
              <Spinner />
            ) : matches?.length === 0 ? (
              <p className="text-center text-gray-500">No tickets found.</p>
            ) : (
              sortMatchesByTicket.map((match) => {
                const ticket = tickets?.find(
                  (t) => t.matchId === match.matchId,
                );

                return (
                  <div
                    key={match.matchId}
                    className="border rounded-xl p-4 flex flex-col gap-3"
                  >
                    <Teams ticket={match} />
                    <Info match={match} ticket={ticket!} />
                  </div>
                );
              })
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
