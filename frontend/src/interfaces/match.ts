import { MatchStatus } from "./types";

export interface ICountry {
  alpha2: string;
  alpha3: string;
  name: string;
  slug: string;
}

export interface ISport {
  name: string;
  slug: string;
  id: number;
}

export interface IFieldTranslations {
  nameTranslation: Record<string, string>;
  shortNameTranslation: Record<string, string>;
}

export interface ICategory {
  name: string;
  slug: string;
  sport: ISport;
  id: number;
  country: ICountry;
  flag: string;
  alpha2: string;
  fieldTranslations: IFieldTranslations;
}

export interface IUniqueTournament {
  name: string;
  slug: string;
  primaryColorHex: string;
  secondaryColorHex: string;
  category: ICategory;
  userCount: number;
  hasPerformanceGraphFeature: boolean;
  id: number;
  country: Record<string, unknown>;
  hasEventPlayerStatistics: boolean;
  displayInverseHomeAwayTeams: boolean;
  fieldTranslations: IFieldTranslations;
}

export interface ITournament {
  name: string;
  slug: string;
  category: ICategory;
  uniqueTournament: IUniqueTournament;
  priority: number;
  isGroup: boolean;
  isLive: boolean;
  id: number;
  fieldTranslations: IFieldTranslations;
}

export interface ISeason {
  name: string;
  year: string;
  editor: boolean;
  id: number;
}

export interface IRoundInfo {
  round: number;
}

export interface IMatchStatus {
  code: number;
  description: string;
  type: MatchStatus;
}

export interface ITeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface ITeam {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: ISport;
  userCount: number;
  nameCode: string;
  disabled: boolean;
  national: boolean;
  type: number;
  id: number;
  country: ICountry;
  subTeams: unknown[];
  teamColors: ITeamColors;
  fieldTranslations: IFieldTranslations;
}

export interface IScore {
  aggregated: number;
  current: number;
  display: number;
  period1: number;
  period2: number;
  normaltime: number;
  extra1: number;
  extra2: number;
  overtime: number;
  penalties: number;
}

export interface IMatchTime {
  injuryTime1?: number;
  injuryTime2?: number;
  currentPeriodStartTimestamp: number;
}

export interface IMatchChanges {
  changes: string[];
  changeTimestamp: number;
}

export interface IVarInProgress {
  homeTeam: boolean;
  awayTeam: boolean;
}

export interface IMatchEvent {
  tournament: ITournament;
  season: ISeason;
  roundInfo: IRoundInfo;
  customId: string;
  status: IMatchStatus;
  winnerCode: number;
  homeTeam: ITeam;
  awayTeam: ITeam;
  homeScore: IScore;
  awayScore: IScore;
  time: IMatchTime;
  changes: IMatchChanges;
  hasGlobalHighlights: boolean;
  hasXg: boolean;
  hasEventPlayerStatistics: boolean;
  hasEventPlayerHeatMap: boolean;
  detailId: number;
  crowdsourcingDataDisplayEnabled: boolean;
  id: number;
  varInProgress: IVarInProgress;
  slug: string;
  startTimestamp: number;
  finalResultOnly: boolean;
  feedLocked: boolean;
  isEditor: boolean;
}

export interface IMatch {
  events: IMatchEvent[];
  hasNextPage: boolean;
}
