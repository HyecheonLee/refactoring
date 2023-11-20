import {Invoice, Performance, PerformanceDetail, Play, Plays, StatementData} from "./types";

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
  return {
    ...newPerformance,
    play: play,
    amount: amountFor(newPerformance, play),
    volumeCredits: volumeCreditsFor(newPerformance, play),
  }

  function amountFor(performance: Performance, play: Play) {
    let result = 0;
    switch (play.type) {
      case "tragedy": // 비극
        result = 40000;
        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20);
          result += 300 * performance.audience;
          break;
        }
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result;
  }

  function playFor(performance: Performance, plays: Plays) {
    return plays[performance.playID];
  }

  function volumeCreditsFor(performance: Performance, play: Play) {
    let result = 0;
    result += Math.max(performance.audience - 30, 0);
    if ("comedy" === play.type) result += Math.floor(performance.audience / 5);
    return result;
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
