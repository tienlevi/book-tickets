import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { QUERY_KEY } from "@/constants/query-key";
import useLogout from "@/hooks/useLogout";
import useSession from "@/hooks/useSession";
import useTicketsUser from "@/hooks/useTicketsUser";
import { IMatchDetail } from "@/interfaces/match";
import { getMatchById } from "@/services/matches";
import { formatMatchDate } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const { user, isLoading } = useSession();
  const { data } = useTicketsUser();
  const { data: tickets, isLoading: isLoadingTicket } = useQuery<
    IMatchDetail[]
  >({
    queryKey: [QUERY_KEY.MATCHES, user?.uid, data?.tickets],
    queryFn: async () => {
      const response = data?.tickets.map(async (ticket) => {
        console.log("🚀 ~ fetchMatch ~ ticket:", ticket);
        return await getMatchById(ticket.matchId);
      });
      return await Promise.all(response || []);
    },
    enabled: !!user?.uid && !!data?.tickets,
    refetchOnWindowFocus: true,
  });
  const navigate = useNavigate();
  const { logout } = useLogout();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading]);

  if (isLoading || isLoadingTicket) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <img
                  src={user?.picture}
                  alt="user avatar"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <button
                  onClick={() => logout()}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Logout
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>My Tickets</CardTitle>
              <CardDescription>
                Here are the tickets you have booked.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {tickets?.map((ticket) => (
                  <div key={ticket.event.id} className="border p-4 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{`${ticket.event.homeTeam.name} vs ${ticket.event.awayTeam.name}`}</p>
                        <p className="text-sm text-gray-500">
                          {formatMatchDate(ticket.event.startTimestamp || 0)}
                        </p>
                      </div>
                      <div className="text-right">
                        <Link
                          to={`/match/${ticket.event.id}`}
                          className="font-semibold"
                        >
                          Detail
                        </Link>
                        <p
                          className={`text-sm ${
                            ticket.event.status.type === "inprogress"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {ticket.event.status.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
