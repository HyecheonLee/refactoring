import {Invoice, Performance, Play, Plays} from "./types";

type PerformanceDetail = Performance & {
  play: Play
  amount: number;
  volumeCredits: number;
};

type InvoiceWithDetail = {
  customer: string;
  performance: PerformanceDetail[]
}

export function statement(invoice: Invoice, plays: Plays) {

  const statementData: InvoiceWithDetail = {
    customer: invoice.customer,
    performance: invoice.performances.map(value => enrichPerformance(value)),
  };

  return renderPlainText(statementData, plays);

  function enrichPerformance(performance: Performance): PerformanceDetail {
    const newPerformance = {...performance} as Performance;
    const play = playFor(newPerformance);
    return {
      ...newPerformance,
      play: play,
      amount: amountFor(newPerformance, play),
      volumeCredits: volumeCreditsFor(newPerformance, play),
    }
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

  function playFor(performance: Performance) {
    return plays[performance.playID];
  }

  function volumeCreditsFor(performance: Performance, play: Play) {
    let result = 0;
    result += Math.max(performance.audience - 30, 0);
    if ("comedy" === play.type) result += Math.floor(performance.audience / 5);
    return result;
  }
}


function renderPlainText(data: InvoiceWithDetail, plays: Plays) {

  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (const performance of data.performance) {
    result += ` ${performance.play.name}: ${usd(performance.amount)} (${performance.audience}석)\n`;
  }

  result += `총액: ${usd(totalAmount(data))}\n`;
  result += `적립 포인트: ${totalVolumeCredits(data)}점\n`;
  return result;
}

function usd(number: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2
  }).format(number / 100);
}

function totalCalc<T>(data: T[], callback: (acc: number, curr: T) => number) {
  return data.reduce(callback, 0);
}

function totalAmount(data: InvoiceWithDetail) {
  return totalCalc(data.performance, (acc, curr) => acc + curr.amount);
}

function totalVolumeCredits(data: InvoiceWithDetail) {
  return totalCalc(data.performance, (acc, curr) => acc + curr.volumeCredits);
}
