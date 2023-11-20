import {Invoice, Performance, Play, Plays} from "./types";

export function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2
  }).format;

  for (const performance of invoice.performances) {
    const play = playFor(performance);

    const thisAmount = amountFor(play, performance);

    volumeCredits += Math.max(performance.audience - 30, 0);
    if ("comedy" === play.type) volumeCredits += Math.floor(performance.audience / 5);
    result += ` ${play.name}: ${format(thisAmount / 100)} (${performance.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;

  function playFor(performance: Performance) {
    return plays[performance.playID];
  }

  function amountFor(play: Play, perf: Performance) {
    let result = 0;
    switch (play.type) {
      case "tragedy": // 비극
        result = 40000;
        if (perf.audience > 30) {
          result += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (perf.audience > 20) {
          result += 10000 + 500 * (perf.audience - 20);
          result += 300 * perf.audience;
          break;
        }
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result;
  }
}
