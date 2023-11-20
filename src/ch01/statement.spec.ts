import {expect, test} from '@jest/globals';

import {statement} from "./statement";
import {invoices, plays} from "./data";

test("statement", () => {
  const result = statement(invoices[0], plays);
  expect(result).toContain("청구 내역 (고객명: BigCo)")
  expect(result).toContain("Hamlet: $650.00 (55석)")
  expect(result).toContain("As You Like It: $580.00 (35석)")
  expect(result).toContain("Othello: $500.00 (40석)")
  expect(result).toContain("총액: $1,730.00")
  expect(result).toContain("적립 포인트: 47점")
})
