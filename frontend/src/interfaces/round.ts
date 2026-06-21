export interface IRoundItem {
  roundId: string;
  localizedKey: string;
}

export interface IRound {
  currentRound: IRoundItem;
  rounds: IRoundItem[];
}
