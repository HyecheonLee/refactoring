type Order = {
  amount: number;
}
type Invoice = {
  customer: string;
  orders: Order[];
  dueDate: Date;
}

abstract class Clock {
  static today: Date = new Date("2023-11-01");
}

function printBaneer() {
  console.log("***********************");
  console.log("**** 고객 채무 ****");
  console.log("***********************");
}

function printDetails(invoice: Invoice, outstanding: number) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function recordDueDate(invoice: Invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function calcOutstanding(invoice: Invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}

function printOwing(invoice: Invoice) {

  printBaneer();
  recordDueDate(invoice);
  printDetails(invoice, calcOutstanding(invoice));

}
