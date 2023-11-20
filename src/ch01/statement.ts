import {Invoice, Performance, Plays} from "./types";

export function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;


  for (const performance of invoice.performances) {
    volumeCredits += volumeCreditsFor(performance);

    result += ` ${playFor(performance).name}: ${usd(amountFor(performance))} (${performance.audience}석)\n`;
    totalAmount += amountFor(performance);
  }

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;

  function usd(number: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format(number / 100);
  }

  function volumeCreditsFor(performance: Performance) {
    let result = 0;
    result += Math.max(performance.audience - 30, 0);
    if ("comedy" === playFor(performance).type) result += Math.floor(performance.audience / 5);
    return result;
  }

  function playFor(performance: Performance) {
    return plays[performance.playID];
  }

  function amountFor(performance: Performance) {
    let result = 0;
    switch (playFor(performance).type) {
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
        throw new Error(`알 수 없는 장르: ${playFor(performance).type}`);
    }
    return result;
  }
}
