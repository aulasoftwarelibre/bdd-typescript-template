import { mock, mockReset } from 'jest-mock-extended';

import Bill from './bill';
import Priced from './priced';

describe('Bill', () => {
  let bill = new Bill();
  const menu = mock<Priced>();

  beforeEach(() => {
    bill = new Bill();
    mockReset(menu);
    menu.price.mockReturnValue(1000);
  });

  it('has no items by default', () => {
    expect(bill.total()).toBe(0);
  });

  it('add an item', () => {
    bill.add(menu);
    expect(bill.total()).toBe(1100);
  });

  it('can be paid with money', () => {
    bill.add(menu);
    bill.payWithMoney(1100);
    expect(bill.restToPay()).toBe(0);
  });

  it('can give points when is payed with money', () => {
    bill.add(menu);
    bill.payWithMoney(1100);
    expect(bill.points()).toBe(10);
  });

  it('cannot give points when total is not enough', () => {
    const otherMenu = mock<Priced>();
    otherMenu.price.mockReturnValue(99);

    bill.add(otherMenu);
    bill.payWithMoney(109);
    expect(bill.points()).toBe(0);
  });

  it('can be paid with money and points and get no points', () => {
    bill.add(menu);
    bill.payWithMoney(1000);
    bill.payWithPoints(10);
    expect(bill.restToPay()).toBe(0);
    expect(bill.points()).toBe(0);
  });

  it('cannot pay VAT with points', () => {
    bill.add(menu);
    bill.payWithPoints(110);
    expect(bill.restToPay()).toBe(100);
  });
});
