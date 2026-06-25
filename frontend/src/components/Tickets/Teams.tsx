import { IMatchDetail } from "@/interfaces/match";
import { clubImage } from "@/utils/images";

function Teams({ ticket }: { ticket: IMatchDetail }) {
  return (
    <div className="flex items-center justify-between gap-2">
      {/* Home team */}
      <div className="flex flex-col items-center gap-1 flex-1">
        <img
          src={clubImage(ticket.homeTeam.id)}
          alt={ticket.homeTeam.name}
          className="w-10 h-10 object-contain"
        />
        <p className="text-xs font-medium text-center leading-tight">
          {ticket.homeTeam.name}
        </p>
      </div>

      {/* Score / VS */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-2xl font-bold tabular-nums">
          {ticket.status.scoreStr ?? "-"}
        </p>

        <span
          className={
            ticket.status.finished
              ? "text-red-500"
              : ticket.status.started
                ? "text-yellow-500"
                : ticket.status.cancelled
                  ? "text-gray-400"
                  : "text-green-500"
          }
        >
          {ticket.status.finished
            ? "Finished"
            : ticket.status.started
              ? "Live"
              : ticket.status.cancelled
                ? "Cancelled"
                : "Not Started"}
        </span>
      </div>

      {/* Away team */}
      <div className="flex flex-col items-center gap-1 flex-1">
        <img
          src={clubImage(ticket.awayTeam.id)}
          alt={ticket.awayTeam.name}
          className="w-10 h-10 object-contain"
        />
        <p className="text-xs font-medium text-center leading-tight">
          {ticket.awayTeam.name}
        </p>
      </div>
    </div>
  );
}

export default Teams;
