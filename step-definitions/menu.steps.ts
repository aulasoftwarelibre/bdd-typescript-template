import { Before, DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'expect';

import Bill from '@/restaurant/bill';
import Menu from '@/restaurant/menu';

let menus: Menu[];
let bill: Bill;

Before(() => {
  menus = [];
  bill = new Bill();
});

Given('los siguientes menús:', function (dataTable: DataTable) {
  dataTable.rows().forEach((values) => {
    const menuId = parseInt(values[0], 10);
    const menuPrice = parseInt(values[1], 10);
    menus[menuId] = new Menu(menuId, 100 * menuPrice);
  });
});

Given(
  /^que he comprado (\d+) menús? del número (\d+)$/,
  function (units: number, option: number) {
    const menu = menus[option];
    for (let i = 0; i < units; i++) {
      bill.add(menu);
    }
  },
);

When(
  'pido la cuenta recibo una factura de {int} euros',
  function (total: number) {
    expect(bill.total()).toEqual(total * 100);
  },
);

When('pago en efectivo con {int} euros', function (ammount: number) {
  bill.payWithMoney(ammount * 100);
});

Then('la factura está pagada', function () {
  expect(bill.restToPay()).toEqual(0);
});

Then('he obtenido {int} puntos', function (points: number) {
  expect(bill.points()).toEqual(points);
});

When(
  'pago con {int} puntos y {int} euros',
  function (points: number, money: number) {
    bill.payWithMoney(money * 100);
    bill.payWithPoints(points);
  },
);

Then('quedan {int} euros por pagar', function (amount: number) {
  expect(amount * 100).toEqual(bill.restToPay());
});
