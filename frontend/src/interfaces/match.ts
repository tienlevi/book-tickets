export interface Team {
  name: string;
  shortName: string;
  id: string;
}

export interface MatchReason {
  short: string;
  shortKey: string;
  long: string;
  longKey: string;
}

export interface MatchStatus {
  utcTime: string;
  timezone: string;
  finished: boolean;
  started: boolean;
  cancelled: boolean;
  awarded: boolean;
  scoreStr: string;
  reason: MatchReason;
}

export interface IMatch {
  round: string;
  roundName: number;
  pageUrl: string;
  id: string;
  home: Team;
  away: Team;
  status: MatchStatus;
}

export interface IMatchDetail {
  matchId: string;
  matchName: string;
  matchRound: string;
  teamColors: {
    darkMode: {
      home: string;
      away: string;
    };
    lightMode: {
      home: string;
      away: string;
    };
    fontDarkMode: {
      home: string;
      away: string;
    };
    fontLightMode: {
      home: string;
      away: string;
    };
  };
  leagueId: number;
  leagueName: string;
  leagueRoundName: string;
  parentLeagueId: number;
  countryCode: string;
  homeTeam: {
    name: string;
    id: number;
  };
  awayTeam: {
    name: string;
    id: number;
  };
  coverageLevel: string;
  matchTimeUTC: string;
  matchTimeUTCDate: string;
  started: boolean;
  finished: boolean;
  gender: string;
  location: string;
  status: MatchStatus;
}
