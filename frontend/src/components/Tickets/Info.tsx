import { formatMatchDate, formatUTCString } from "@/utils/format";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { IMatchDetail } from "@/interfaces/match";
import { ITicket } from "@/interfaces/ticket";

interface Props {
  match: IMatchDetail;
  ticket: ITicket;
}

function Info({ match, ticket }: Props) {
  return (
    <div className="flex flex-col space-y-4 text-xs text-gray-500">
      <p className="flex justify-center items-center gap-1 text-lg text-black font-bold">
        <span>📍</span>
        {match.location}
      </p>
      <p className="text-base">
        Time book ticket: {formatMatchDate(ticket?.created_at || 0)}
      </p>
      <p className="text-base">
        Time start: {formatUTCString(match.matchTimeUTC)}
      </p>
      <Link to={`/match/${match.matchId}`}>
        <Button size="sm" className="cursor-pointer w-full">
          Detail
        </Button>
      </Link>
    </div>
  );
}

export default Info;
