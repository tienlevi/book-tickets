import { MatchStatus } from "./types";

// Match list
interface ICountry {
  alpha2: string;
  alpha3: string;
  name: string;
  slug: string;
}

interface ISport {
  name: string;
  slug: string;
  id: number;
}

interface IFieldTranslations {
  nameTranslation: Record<string, string>;
  shortNameTranslation: Record<string, string>;
}

interface ICategory {
  name: string;
  slug: string;
  sport: ISport;
  id: number;
  country: ICountry;
  flag: string;
  alpha2: string;
  fieldTranslations: IFieldTranslations;
}

interface IUniqueTournament {
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

interface ITournament {
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

interface ISeason {
  name: string;
  year: string;
  editor: boolean;
  id: number;
}

interface IRoundInfo {
  round: number;
}

interface IMatchStatus {
  code: number;
  description: string;
  type: MatchStatus;
}

interface ITeamColors {
  primary: string;
  secondary: string;
  text: string;
}

interface ITeam {
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

interface IScore {
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

interface IMatchTime {
  injuryTime1?: number;
  injuryTime2?: number;
  currentPeriodStartTimestamp: number;
}

interface IMatchChanges {
  changes: string[];
  changeTimestamp: number;
}

interface IVarInProgress {
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

// Match Detail
interface IVenue {
  city: ICity;
  stadium: IStadium;
  id: number;
  country: ICountry;
}

interface ICity {
  name: string;
}

interface IStadium {
  name: string;
  capacity: number;
}

interface IReferee {
  name: string;
  slug: string;
  yellowCards: number;
  redCards: number;
  yellowRedCards: number;
  games: number;
  id: number;
  country: ICountry;
}

export interface IMatchDetailEvent extends IMatchEvent {
  correctAiInsight: boolean;
  correctHalftimeAiInsight: boolean;
  venue: IVenue;
  referee: IReferee;
  defaultPeriodCount: number;
  defaultPeriodLength: number;
  defaultOvertimeLength: number;
  currentPeriodStartTimestamp: number;
  seasonStatisticsType: string;
  showTotoPromo: boolean;
}

export interface IMatchDetail {
  event: IMatchDetailEvent;
}
