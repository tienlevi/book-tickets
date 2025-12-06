import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMatches } from "@/hooks/useMatches";
import { useSeasons } from "@/hooks/useSeasons";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const MatchCard = ({ match }: any) => {
  const { homeTeam, awayTeam, timeBegin, stadium } = match;

  const formatMatchTime = (dateString: string) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    return { time, day };
  };

  const { time, day } = formatMatchTime(timeBegin);

  return (
    <div
      className="group relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
      role="article"
      aria-label={`Match: ${homeTeam.name} vs ${awayTeam.name}`}
      tabIndex={0}
    >
      {/* Match Time Badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
        {day}
      </div>

      {/* Teams Container */}
      <div className="flex items-center justify-between gap-4 mt-4">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-16 h-16 rounded-full bg-white/10 p-2 ring-2 ring-white/20 group-hover:ring-emerald-500/50 transition-all">
            <img
              src={homeTeam.image}
              alt={`${homeTeam.name} logo`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <span className="text-white font-semibold text-sm text-center line-clamp-2">
            {homeTeam.name}
          </span>
        </div>

        {/* VS & Time */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
            VS
          </span>
          <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/10">
            <span className="text-emerald-400 font-bold text-lg">{time}</span>
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-16 h-16 rounded-full bg-white/10 p-2 ring-2 ring-white/20 group-hover:ring-emerald-500/50 transition-all">
            <img
              src={awayTeam.image}
              alt={`${awayTeam.name} logo`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <span className="text-white font-semibold text-sm text-center line-clamp-2">
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* Stadium Info */}
      {stadium && (
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <span className="text-gray-400 text-xs flex items-center justify-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {stadium}
          </span>
        </div>
      )}
    </div>
  );
};

function Matches() {
  const { data: seasons, isLoading: loadingSeasons } = useSeasons();
  const params = new URLSearchParams();
  const seasonId = params.get("seasonId");
  const round = params.get("round");
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]?.id);
  const [selectedRound, setSelectedRound] = useState(round);
  const { data: match, isLoading: loadingMatches } = useMatches(
    selectedSeason,
    16
  );
  const isLoading = loadingSeasons || loadingMatches;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full p-6">
      {/* Season Selector */}
      <div className="mb-8">
        <Select
          value={selectedSeason?.toString()}
          defaultValue={seasons?.[0]?.id.toString()}
          onValueChange={(value) => setSelectedSeason(+value)}
        >
          <SelectTrigger variant="primary" className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent variant="primary" className="h-[200px]">
            {seasons.map((season) => (
              <SelectItem key={season.id} value={season.id.toString()}>
                {season.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {match?.events.map((match) => (
          <div
            className="group relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
            role="article"
            aria-label={`Match: ${match.homeTeam.name} vs ${match.awayTeam.name}`}
            tabIndex={0}
          >
            {/* Match Time Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              {0}
            </div>

            {/* Teams Container */}
            <div className="flex items-center justify-between gap-4 mt-4">
              {/* Home Team */}
              <div className="flex flex-col items-center gap-3 flex-1">
                <div className="w-16 h-16 rounded-full bg-white/10 p-2 ring-2 ring-white/20 group-hover:ring-emerald-500/50 transition-all">
                  {/* <img
                    src={homeTeam.image}
                    alt={`${homeTeam.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  /> */}
                </div>
                <span className="text-white font-semibold text-sm text-center line-clamp-2">
                  {match.homeTeam.name}
                </span>
              </div>

              {/* VS & Time */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                  VS
                </span>
                <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/10">
                  <span className="text-emerald-400 font-bold text-lg">
                    {0}
                  </span>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center gap-3 flex-1">
                <div className="w-16 h-16 rounded-full bg-white/10 p-2 ring-2 ring-white/20 group-hover:ring-emerald-500/50 transition-all">
                  {/* <img
                    src={awayTeam.image}
                    alt={`${awayTeam.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  /> */}
                </div>
                <span className="text-white font-semibold text-sm text-center line-clamp-2">
                  {match.awayTeam.name}
                </span>
              </div>
            </div>

            {/* Stadium Info */}
            {/* {stadium && (
              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <span className="text-gray-400 text-xs flex items-center justify-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {stadium}
                </span>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;
