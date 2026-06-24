import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import useBookTicket from "@/hooks/useBookTicket";
import useCancelTicket from "@/hooks/useCancelTicket";
import useTickets from "@/hooks/useTickets";
import { IMatchDetail } from "@/interfaces/match";
import { Ticket } from "lucide-react";

interface Props {
  match: IMatchDetail;
}

function Tickets({ match }: Props) {
  const { mutate: bookTicket, isPending: isBooking } = useBookTicket();
  const { mutate: cancelTicket, isPending: isCancelling } = useCancelTicket();
  const { data: ticket } = useTickets(match.matchId);

  const handleBookTicket = () => {
    bookTicket({
      matchId: match.matchId,
      round: match.matchRound,
    });
  };

  const handleCancelTicket = () => {
    cancelTicket(match.matchId || "");
  };

  return (
    <Card className="bg-slate-800/50 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Ticket className="h-5 w-5 text-purple-400" aria-hidden="true" />
          Tickets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {match.status.cancelled && (
          <p className="text-gray-400 text-sm text-center py-4">
            This match has been cancelled.
          </p>
        )}

        {!match.status.cancelled &&
          match.status.started &&
          !match.status.finished && (
            <p className="text-gray-400 text-sm text-center py-4">
              This match is in progress. Ticket booking is no longer available.
            </p>
          )}

        {!match.status.cancelled && match.status.finished && (
          <p className="text-gray-400 text-sm text-center py-4">
            This match has ended. Ticket booking is no longer available.
          </p>
        )}

        {!match.status.cancelled &&
          !match.status.started &&
          !match.status.finished && (
            <>
              {ticket?.tickets ? (
                <Button
                  onClick={handleCancelTicket}
                  disabled={isCancelling}
                  className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 shadow-lg shadow-purple-500/25"
                >
                  Cancel Ticket
                </Button>
              ) : (
                <Button
                  onClick={handleBookTicket}
                  disabled={isBooking}
                  className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 shadow-lg shadow-purple-500/25"
                >
                  Book Now
                </Button>
              )}
            </>
          )}
      </CardContent>
    </Card>
  );
}

export default Tickets;
