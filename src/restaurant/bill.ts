import Priced from './priced';

class Bill {
  private readonly VAT = 1.1;
  private items: Priced[];
  private committed: number;
  private usedPoints: number;

  constructor() {
    this.items = [];
    this.committed = 0;
    this.usedPoints = 0;
  }

  add(item: Priced): void {
    this.items.push(item);
  }

  total(): number {
    return this.VAT * this.totalBeforeVAT();
  }

  payWithMoney(amount: number): void {
    this.committed = amount;
  }

  payWithPoints(amount: number): void {
    this.usedPoints = amount;
  }

  restToPay(): number {
    return this.total() - this.committed - this.moneyPoints();
  }

  points(): number {
    if (this.usedPoints > 0) {
      return 0;
    }

    return Math.floor(this.totalBeforeVAT() / 100);
  }

  private totalBeforeVAT(): number {
    return this.items.reduce(
      (carry: number, item: Priced) => carry + item.price(),
      0,
    );
  }

  private moneyPoints(): number {
    const maxMoneyPoints = this.totalBeforeVAT();
    const moneyPoints = (100 * this.usedPoints) / 10;

    return moneyPoints > maxMoneyPoints ? maxMoneyPoints : moneyPoints;
  }
}

export default Bill;
