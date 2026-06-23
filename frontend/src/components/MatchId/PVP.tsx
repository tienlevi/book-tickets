import { Card, CardContent, CardHeader } from "@/components/ui";
import { IMatchDetail } from "@/interfaces/match";
import { formatUTCString } from "@/utils/format";
import { clubImage } from "@/utils/images";

interface Props {
  match: IMatchDetail;
}

function PVP({ match }: Props) {
  const renderStatus = (match: IMatchDetail) => {
    const isStarted = match.status.started;
    const isFinished = match.status.finished;
    const isCancelled = match.status.cancelled;

    if (isStarted && !isFinished && !isCancelled) {
      return <div className="text-white">In match</div>;
    } else if (isStarted && isFinished && !isCancelled) {
      return <div className="text-green-500">Finished</div>;
    } else if (!isStarted && !isFinished && isCancelled) {
      return <div className="text-red-500">Cancelled</div>;
    } else {
      return <div className="text-yellow-500">Not started</div>;
    }
  };

  return (
    <>
      <Card className="bg-linear-to-br from-slate-800/90 to-slate-900/90 border-white/10 backdrop-blur-sm mb-8">
        <CardHeader className="text-center border-b border-white/10">
          <div className="flex flex-col items-center gap-3">
            {renderStatus(match)}
            <p className="text-gray-400 text-sm">
              {formatUTCString(match.matchTimeUTC)}
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          {/* Teams & Score */}
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="rounded-full bg-white/10 p-3 ring-4 ring-white/20">
                <img
                  src={clubImage(match.homeTeam.id)}
                  alt={`${match.homeTeam.name} logo`}
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h3 className="text-white font-bold text-lg md:text-xl">
                  {match.homeTeam.name}
                </h3>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-2">
              <div className="bg-white/10 rounded-lg px-4 py-2 border border-white/20">
                <span className="text-emerald-400 font-bold text-3xl">
                  {match.status.scoreStr || "0 - 0"}
                </span>
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="rounded-full bg-white/10 p-3 ring-4 ring-white/20">
                <img
                  src={clubImage(match.awayTeam.id)}
                  alt={`${match.awayTeam.name} logo`}
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h3 className="text-white font-bold text-lg md:text-xl">
                  {match.awayTeam.name}
                </h3>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default PVP;
