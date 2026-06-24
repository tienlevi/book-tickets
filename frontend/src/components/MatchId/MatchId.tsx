import { useParams, useNavigate } from "react-router-dom";
import { useMatchById } from "@/hooks/useMatchById";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { tournamentImage } from "@/utils/images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Info } from "lucide-react";
import Tickets from "./Tickets";
import PVP from "./PVP";

function MatchId() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useMatchById(Number(matchId));

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Spinner className="size-10! text-white" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4">
        <p className="text-white text-xl">Match not found</p>
        <Button
          onClick={handleGoBack}
          className="bg-purple-600 hover:bg-purple-700"
          aria-label="Go back to previous page"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-8">
      {/* Back Button */}
      <Button
        onClick={handleGoBack}
        variant="ghost"
        className="text-white hover:bg-white/10 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" />
        Back
      </Button>

      {/* Tournament Info */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src={tournamentImage(data.leagueId)}
          alt={data.leagueName}
          className="w-10 h-10 object-contain bg-white p-2 rounded-full"
          loading="lazy"
        />
        <div>
          <h2 className="text-white font-semibold">
            {data.homeTeam.name} vs {data.awayTeam.name}
          </h2>
          <p className="text-gray-400 text-sm">Round {data.matchRound}</p>
        </div>
      </div>

      {/* Main Match Card */}
      <PVP match={data} />

      {/* Match Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Match Details */}
        <Card className="bg-slate-800/50 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Info className="h-5 w-5 text-emerald-400" aria-hidden="true" />
              Match Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">Competition</span>
              <span className="text-white font-medium">{data.leagueName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">Round</span>
              <span className="text-white font-medium">{data.matchRound}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Stadium</span>
              <span className="text-white font-medium">{data.location}</span>
            </div>
          </CardContent>
        </Card>

        {/* Ticket Booking */}
        <Tickets match={data} />
      </div>
    </div>
  );
}

export default MatchId;
