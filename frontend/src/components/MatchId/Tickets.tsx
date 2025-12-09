import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { IMatchDetailEvent } from "@/interfaces/match";
import { Ticket } from "lucide-react";

interface Props {
  match: IMatchDetailEvent;
}

function Tickets({ match }: Props) {
  return (
    <Card className="bg-slate-800/50 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Ticket className="h-5 w-5 text-purple-400" aria-hidden="true" />
          Book Tickets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {match.status.type === "notstarted" ? (
          <>
            <p className="text-gray-400 text-sm">
              Secure your seat for this exciting match! Tickets are available
              now.
            </p>
            <Button
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 shadow-lg shadow-purple-500/25"
              aria-label="Book tickets for this match"
              tabIndex={0}
            >
              Book Now
            </Button>
          </>
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">
            {match.status.type === "finished"
              ? "This match has ended. Ticket booking is no longer available."
              : "This match is currently in progress. Ticket booking is closed."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default Tickets;
