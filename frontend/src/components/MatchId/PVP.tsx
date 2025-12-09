import { Card, CardContent, CardHeader } from "@/components/ui";
import { IMatchDetailEvent } from "@/interfaces/match";
import { MatchStatus } from "@/interfaces/types";
import { formatMatchDate } from "@/utils/format";
import { clubImage } from "@/utils/images";

interface Props {
  match: IMatchDetailEvent;
}

function PVP({ match }: Props) {
  const renderStatus = (status: MatchStatus) => {
    switch (status) {
      case "notstarted":
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            Not Started
          </span>
        );
      case "finished":
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Finished
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Live
          </span>
        );
    }
  };

  return (
    <>
      <Card className="bg-linear-to-br from-slate-800/90 to-slate-900/90 border-white/10 backdrop-blur-sm mb-8">
        <CardHeader className="text-center border-b border-white/10">
          <div className="flex flex-col items-center gap-3">
            {renderStatus(match.status.type)}
            <p className="text-gray-400 text-sm">
              {formatMatchDate(match.startTimestamp)}
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          {/* Teams & Score */}
          <div className="flex items-center justify-between gap-4">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 p-3 ring-4 ring-white/20">
                <img
                  src={clubImage(match.homeTeam.id)}
                  alt={`${match.homeTeam.name} logo`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h3 className="text-white font-bold text-lg md:text-xl">
                  {match.homeTeam.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {match.homeTeam.shortName}
                </p>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="bg-white/10 rounded-xl px-6 py-4 md:px-8 md:py-6 border border-white/20">
                <span className="text-emerald-400 font-black text-3xl md:text-5xl">
                  {match.homeScore.display ?? 0}
                </span>
              </div>
              <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                :
              </span>
              <div className="bg-white/10 rounded-xl px-6 py-4 md:px-8 md:py-6 border border-white/20">
                <span className="text-emerald-400 font-black text-3xl md:text-5xl">
                  {match.awayScore.display ?? 0}
                </span>
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 p-3 ring-4 ring-white/20">
                <img
                  src={clubImage(match.awayTeam.id)}
                  alt={`${match.awayTeam.name} logo`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h3 className="text-white font-bold text-lg md:text-xl">
                  {match.awayTeam.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {match.awayTeam.shortName}
                </p>
              </div>
            </div>
          </div>

          {/* Half Time Score */}
          {match.status.type === "finished" && (
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Half Time: {match.homeScore.period1 ?? 0} -{" "}
                {match.awayScore.period1 ?? 0}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default PVP;
