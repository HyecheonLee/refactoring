import {expect, test} from '@jest/globals';

import {statement} from "./statement";
import {invoices, plays} from "./data";

test("statement", () => {
  const result = statement(invoices[0], plays);
  console.log(result);
  // expect("").toBe("");
})
