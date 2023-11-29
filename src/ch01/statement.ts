import {Invoice, Plays, StatementData} from "./types";
import createStatementData from "./createStatementData";

export function statement(invoice: Invoice, plays: Plays) {

  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data: StatementData) {

  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (const performance of data.performance) {
    result += ` ${performance.play.name}: ${usd(performance.amount)} (${performance.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}

export function htmlStatement(invoice: Invoice, plays: Plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data: StatementData) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
  result += "<table>\n"
  result += `<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n`
  for (const performance of data.performance) {
    result += `<tr><td>${performance.play.name}</td><td>${usd(performance.amount)}</td><td>(${performance.audience}석)</td></tr>\n`;
  }
  result += "</table>\n";

  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
  return result;
}

function usd(number: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2
  }).format(number / 100);
}

