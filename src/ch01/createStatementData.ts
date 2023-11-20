import {Invoice, Performance, PerformanceDetail, Play, Plays, StatementData} from "./types";

abstract class PerformanceCalculator {
  protected constructor(protected performance: Performance) {
  }

  abstract calcAmount(): number;

  calcVolumeCredits(): number {
    return Math.max(this.performance.audience - 30, 0);
  }

  static create(performance: Performance, play: Play) {
    switch (play.type) {
      case "tragedy":
        return new TragedyCalculator(performance);
      case "comedy":
        return new ComedyCalculator(performance);
    }
  }
}

class TragedyCalculator extends PerformanceCalculator {
  constructor(performance: Performance) {
    super(performance);
  }

  calcAmount(): number {
    let result = 40000;
    result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  constructor(performance: Performance) {
    super(performance);
  }

  calcAmount(): number {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
      result += 300 * this.performance.audience;
    }
    return result;
  }

  calcVolumeCredits(): number {
    let result = 0;
    result += super.calcVolumeCredits();
    result += Math.floor(this.performance.audience / 5);
    return result;
  }
}

export default function createStatementData(invoice: Invoice, plays: Plays) {
  const performance = invoice.performances.map(value => enrichPerformance(value, plays));

  const statementData: StatementData = {
    customer: invoice.customer,
    performance: performance,
    totalAmount: totalAmount(performance),
    totalVolumeCredits: totalVolumeCredits(performance),
  };
  return statementData;
}

function enrichPerformance(performance: Performance, plays: Plays): PerformanceDetail {
  const newPerformance = {...performance} as Performance;
  const play = playFor(newPerformance, plays);
  const calculator = PerformanceCalculator.create(performance, play);
  return {
    ...newPerformance,
    play: play,
    amount: calculator.calcAmount(),
    volumeCredits: calculator.calcVolumeCredits(),
  }

  function playFor(performance: Performance, plays: Plays) {
    return plays[performance.playID];
  }
}

function totalCalc<T>(data: T[], callback: (acc: number, curr: T) => number) {
  return data.reduce(callback, 0);
}

function totalAmount(performances: PerformanceDetail[]) {
  return totalCalc(performances, (acc, curr) => acc + curr.amount);
}

function totalVolumeCredits(performances: PerformanceDetail[]) {
  return totalCalc(performances, (acc, curr) => acc + curr.volumeCredits);
}
