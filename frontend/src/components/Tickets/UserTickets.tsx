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
import { formatMatchDate } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

function UserTickets() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTicketsUser();

  const { data: tickets, isLoading: isLoadingTicket } = useQuery<
    IMatchDetail[]
  >({
    queryKey: [QUERY_KEY.MATCHES, data?.pages],
    queryFn: async () => {
      const allTickets = data?.pages.flatMap((page) => page.tickets) || [];
      const ticketsDetails = await Promise.all(
        allTickets.map((t) => getMatchById(t.matchId))
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
                <div key={ticket.event.id} className="border p-4 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{`${ticket.event.homeTeam.name} vs ${ticket.event.awayTeam.name}`}</p>
                      <p className="text-sm text-gray-500">
                        {formatMatchDate(ticket.event.startTimestamp || 0)}
                      </p>
                      <p className="gap-x-2">
                        Status: {""}
                        <span
                          className={` ${
                            ticket.event.status.type === "inprogress"
                              ? "text-yellow-500"
                              : ticket.event.status.type === "notstarted"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {ticket.event.status.description}
                        </span>
                      </p>
                    </div>
                    <div className="text-right gap-y-2">
                      <Link
                        to={`/match/${ticket.event.id}`}
                        className="font-semibold"
                      >
                        <Button className=" cursor-pointer">Detail</Button>
                      </Link>
                    </div>
                  </div>
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

export default UserTickets;
