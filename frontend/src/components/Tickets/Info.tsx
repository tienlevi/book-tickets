import { formatMatchDate } from "@/utils/format";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { IMatchDetail } from "@/interfaces/match";

function Info({ ticket }: { ticket: IMatchDetail }) {
  return (
    <div className="flex flex-col space-y-4 text-xs text-gray-500">
      <div className="flex flex-col gap-0.5">
        <p>{formatMatchDate(ticket.event.startTimestamp || 0)}</p>
        {ticket.event.venue && (
          <p className="flex items-center gap-1">
            <span>📍</span>
            {ticket.event.venue.stadium?.name
              ? `${ticket.event.venue.stadium.name}, `
              : ""}
            {ticket.event.venue.city?.name ?? ""}
          </p>
        )}
      </div>
      <Link to={`/match/${ticket.event.id}`}>
        <Button size="sm" className="cursor-pointer">
          Detail
        </Button>
      </Link>
    </div>
  );
}

export default Info;
