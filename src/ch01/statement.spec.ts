import {expect, test} from '@jest/globals';

import {htmlStatement, statement} from "./statement";
import {invoices, plays} from "./data";

test("statement", () => {
  const result = statement(invoices[0], plays);
  expect(result).toContain("청구 내역 (고객명: BigCo)")
  expect(result).toContain("Hamlet: $650.00 (55석)")
  expect(result).toContain("As You Like It: $580.00 (35석)")
  expect(result).toContain("Othello: $500.00 (40석)")
  expect(result).toContain("총액: $1,730.00")
  expect(result).toContain("적립 포인트: 47점")
  console.log(result);
});
test("htmlStatement", () => {
  const result = htmlStatement(invoices[0], plays).replace("\n|\t| ", "");

  expect(result).toContain("<h1>청구 내역 (고객명: BigCo)</h1>")
  expect(result).toContain("<table>")
  expect(result).toContain("<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>")
  expect(result).toContain("<tr><td>Hamlet</td><td>$650.00</td><td>(55석)</td></tr>")
  expect(result).toContain("<tr><td>As You Like It</td><td>$580.00</td><td>(35석)</td></tr>")
  expect(result).toContain("<tr><td>Othello</td><td>$500.00</td><td>(40석)</td></tr>")
  expect(result).toContain("</table>")
  expect(result).toContain("<p>총액: <em>$1,730.00</em></p>")
  expect(result).toContain("<p>적립 포인트: <em>47</em>점</p>")
  console.log(result);
});
