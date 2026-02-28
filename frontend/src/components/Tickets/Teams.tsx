import { IMatchDetail } from "@/interfaces/match";
import { clubImage } from "@/utils/images";

function Teams({ ticket }: { ticket: IMatchDetail }) {
  return (
    <div className="flex items-center justify-between gap-2">
      {/* Home team */}
      <div className="flex flex-col items-center gap-1 flex-1">
        <img
          src={clubImage(ticket.event.homeTeam.id)}
          alt={ticket.event.homeTeam.name}
          className="w-10 h-10 object-contain"
        />
        <p className="text-xs font-medium text-center leading-tight">
          {ticket.event.homeTeam.shortName}
        </p>
      </div>

      {/* Score / VS */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-2xl font-bold tabular-nums">
          {ticket.event.homeScore.display ?? "-"}&nbsp;:&nbsp;
          {ticket.event.awayScore.display ?? "-"}
        </p>

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
      </div>

      {/* Away team */}
      <div className="flex flex-col items-center gap-1 flex-1">
        <img
          src={clubImage(ticket.event.awayTeam.id)}
          alt={ticket.event.awayTeam.name}
          className="w-10 h-10 object-contain"
        />
        <p className="text-xs font-medium text-center leading-tight">
          {ticket.event.awayTeam.shortName}
        </p>
      </div>
    </div>
  );
}

export default Teams;
