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
import { formatMatchDate } from "@/utils/format";
import { MatchStatus } from "@/interfaces/types";
import useRound from "@/hooks/useRound";
import { useNavigate } from "react-router-dom";

function Matches() {
  const params = new URL(window.location.href);
  const seasonId = params.searchParams.get("seasonId");
  const roundParams = params.searchParams.get("round");
  const navigate = useNavigate();
  const { data: seasons, isLoading: loadingSeasons } = useSeasons();
  const currentSeason = seasons[0]?.id;
  const [selectedSeason, setSelectedSeason] = useState(Number(seasonId));
  const { data: round, isLoading: loadingRounds } = useRound(selectedSeason);
  const [selectedRound, setSelectedRound] = useState(Number(roundParams));
  const { data: match, isLoading: loadingMatches } = useMatches(
    selectedSeason,
    selectedRound!
  );
  const isLoading = loadingSeasons || loadingMatches || loadingRounds;

  const handleSelectSeason = (value: string) => {
    navigate(`/?seasonId=${value}&round=${selectedRound}`);
    setSelectedSeason(+value);
  };

  const handleSelectRound = (value: string) => {
    navigate(`/?seasonId=${selectedSeason}&round=${value}`);
    setSelectedRound(+value);
  };

  const renderStatus = (status: MatchStatus) => {
    switch (status) {
      case "notstarted":
        return <div className="text-yellow-500">Not started</div>;
      case "finished":
        return <div className="text-green-500">Finished</div>;
      default:
        return <div className="text-white">In match</div>;
    }
  };

  useEffect(() => {
    if (!seasonId) {
      setSelectedSeason(currentSeason);
    }
    if (!roundParams) {
      setSelectedRound(round?.currentRound?.round ?? 1);
    }
  }, [selectedRound, selectedSeason, seasons, round]);

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
            value={selectedSeason?.toString()}
            onValueChange={handleSelectSeason}
          >
            <SelectTrigger variant="primary" className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent variant="primary" className="h-[200px]">
              {seasons.map((season) => (
                <SelectItem key={season.id} value={season.id.toString()}>
                  {season.name}
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
            <SelectTrigger variant="primary" className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent variant="primary" className="h-[200px]">
              {round?.rounds.map((round) => (
                <SelectItem key={round.round} value={round.round.toString()}>
                  {round.round}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {match?.events.map((match) => (
          <div
            className="group relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
            key={`Match: ${match.homeTeam.name} vs ${match.awayTeam.name}`}
          >
            {/* Match Time Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              {formatMatchDate(match.startTimestamp)}
            </div>

            {/* Teams Container */}
            <div className="flex items-center justify-between gap-4 mt-4">
              {/* Home Team */}
              <div className="flex flex-col items-center gap-3 flex-1">
                <div className="w-16 h-16 rounded-full bg-white/10 p-2 ring-2 ring-white/20 group-hover:ring-emerald-500/50 transition-all">
                  <img
                    src={clubImage(match.homeTeam.id)}
                    alt={`${match.homeTeam.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-white font-semibold text-sm text-center line-clamp-2">
                  {match.homeTeam.name}
                </span>
              </div>

              {/* VS & Time */}
              <div className="flex items-center gap-2">
                <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/10">
                  <span className="text-emerald-400 font-bold text-lg">
                    {match.homeScore.display || 0}
                  </span>
                </div>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                  VS
                </span>
                <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/10">
                  <span className="text-emerald-400 font-bold text-lg">
                    {match.awayScore.display || 0}
                  </span>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center gap-3 flex-1">
                <div className="w-16 h-16 rounded-full bg-white/10 p-2 ring-2 ring-white/20 group-hover:ring-emerald-500/50 transition-all">
                  <img
                    src={clubImage(match.awayTeam.id)}
                    alt={`${match.awayTeam.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-white font-semibold text-sm text-center line-clamp-2">
                  {match.awayTeam.name}
                </span>
              </div>
            </div>

            <div className="text-center">{renderStatus(match.status.type)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;
