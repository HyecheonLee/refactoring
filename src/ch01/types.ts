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
