import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMatches } from "@/hooks/useMatches";
import { useSeasons } from "@/hooks/useSeasons";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { clubImage } from "@/utils/images";
import { formatUTCString } from "@/utils/format";
import { Link, useNavigate } from "react-router-dom";
import useRound from "@/hooks/useRound";
import { IMatch } from "@/interfaces/match";

function Matches() {
  const params = new URL(window.location.href);
  const season = params.searchParams.get("season");
  const roundParams = params.searchParams.get("round");
  const navigate = useNavigate();
  const { data: seasons, isLoading: loadingSeasons } = useSeasons();
  const [selectedSeason, setSelectedSeason] = useState(season);
  const { data: round, isLoading: loadingRounds } = useRound(
    selectedSeason || "",
  );
  const [selectedRound, setSelectedRound] = useState(roundParams);
  const { data: matches, isLoading: loadingMatches } = useMatches(
    selectedSeason!,
    selectedRound!,
  );
  const isLoading = loadingSeasons || loadingMatches || loadingRounds;

  const handleSelectSeason = (value: string) => {
    navigate(`/?season=${value}&round=${selectedRound}`);
    setSelectedSeason(value);
  };

  const handleSelectRound = (value: string) => {
    navigate(`/?season=${selectedSeason}&round=${value}`);
    setSelectedRound(value);
  };

  const renderStatus = (match: IMatch) => {
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

  useEffect(() => {
    if (!season) {
      setSelectedSeason(seasons[0]?.replace("/", "-"));
    }
    if (!roundParams) {
      setSelectedRound(round?.currentRound.roundId || "");
    }
  }, [selectedRound, selectedSeason, seasons, season, round]);

  if (isLoading) {
    return <Spinner className="size-10! text-white" />;
  }

  return (
    <div className="w-full p-6">
      {/* Season Selector */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="text-white">Season: </div>
          <Select
            value={selectedSeason!}
            defaultValue={seasons[0]}
            onValueChange={handleSelectSeason}
          >
            <SelectTrigger variant="primary" className="w-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent variant="primary" className="h-50">
              {seasons.map((season) => (
                <SelectItem key={season} value={season.replace("/", "-")}>
                  {season}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-white">Round: </div>
          <Select
            value={selectedRound?.toString()}
            onValueChange={handleSelectRound}
          >
            <SelectTrigger variant="primary" className="w-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent variant="primary" className="h-50">
              {round?.rounds.map((round) => (
                <SelectItem key={round.roundId} value={round.roundId}>
                  {round.roundId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches?.map((matchItem) => (
          <Link
            className="group relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
            key={`Match: ${matchItem.home.name} vs ${matchItem.away.name}`}
            to={`/match/${matchItem.id}`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              {formatUTCString(matchItem.status.utcTime)}
            </div>

            <div className="flex items-center justify-between gap-4 mt-4">
              <div className="flex flex-col items-center gap-3 flex-1">
                <div className="w-16 h-16 rounded-full bg-white/10 p-2 ring-2 ring-white/20 group-hover:ring-emerald-500/50 transition-all">
                  <img
                    src={clubImage(matchItem.home.id)}
                    alt={`${matchItem.home.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-white font-semibold text-sm text-center line-clamp-2">
                  {matchItem.home.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/10">
                  <span className="text-emerald-400 font-bold text-lg">
                    {matchItem.status.scoreStr || "0 - 0"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 flex-1">
                <div className="w-16 h-16 rounded-full bg-white/10 p-2 ring-2 ring-white/20 group-hover:ring-emerald-500/50 transition-all">
                  <img
                    src={clubImage(matchItem.away.id)}
                    alt={`${matchItem.away.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-white font-semibold text-sm text-center line-clamp-2">
                  {matchItem.away.name}
                </span>
              </div>
            </div>

            <div className="text-center">{renderStatus(matchItem)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Matches;
