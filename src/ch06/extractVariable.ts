type Order = {
  quantity: number;
  itemPrice: number;
}

function prince(order: Order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice * 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}

class Order2 {
  quantity: number;
  itemPrice: number;

  constructor(quantity: number, itemPrice: number) {
    this.quantity = quantity;
    this.itemPrice = itemPrice;
  }

  get basePrice() {
    return this.quantity * this.itemPrice;
  }

  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
  }

  get shipping() {
    return Math.min(this.basePrice * 0.1, 100);
  }

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }
}
