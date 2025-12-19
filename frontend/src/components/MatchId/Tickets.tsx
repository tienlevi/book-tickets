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
import { IMatchDetailEvent } from "@/interfaces/match";
import { Ticket } from "lucide-react";

interface Props {
  match: IMatchDetailEvent;
}

function Tickets({ match }: Props) {
  const { mutate: bookTicket, isPending: isBooking } = useBookTicket();
  const { mutate: cancelTicket, isPending: isCancelling } = useCancelTicket();
  const { data: ticket } = useTickets(match.id);

  const handleBookTicket = () => {
    bookTicket({
      matchId: match.id,
      seasonId: match.season.id,
      round: match.roundInfo.round,
    });
  };

  const handleCancelTicket = () => {
    cancelTicket(match.id);
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
        {match.status.type === "notstarted" && (
          <>
            {ticket?.tickets ? (
              <Button
                onClick={handleCancelTicket}
                disabled={isCancelling}
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 shadow-lg shadow-purple-500/25"
              >
                Cancel ticket
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
        {match.status.type === "finished" && (
          <p className="text-gray-400 text-sm text-center py-4">
            ? "This match has ended. Ticket booking is no longer available." :
            "This match is currently in progress. Ticket booking is closed."
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default Tickets;
