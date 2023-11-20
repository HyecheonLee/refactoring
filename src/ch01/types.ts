type PlayType = 'tragedy' | 'comedy';

export interface Play {
  name: string;
  type: PlayType;
}

export interface Plays {
  [key: string]: Play;
}

type PlayID = 'hamlet' | 'as-like' | 'othello';

export interface Performance {
  playID: PlayID;
  audience: number;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}

export type PerformanceDetail = Performance & {
  play: Play
  amount: number;
  volumeCredits: number;
};

export type StatementData = {
  customer: string;
  performance: PerformanceDetail[],
  totalAmount: number;
  totalVolumeCredits: number;
}
