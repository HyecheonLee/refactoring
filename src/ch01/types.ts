type PlayType = 'tragedy' | 'comedy';

interface Play {
  name: string;
  type: PlayType;
}

export interface Plays {
  [key: string]: Play;
}

type PlayID = 'hamlet' | 'as-like' | 'othello';

interface Performance {
  playID: PlayID;
  audience: number;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}
