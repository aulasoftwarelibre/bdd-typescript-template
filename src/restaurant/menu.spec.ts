import Menu from './menu';

describe('Menu class', () => {
  const OPTION = 10;
  const PRICE = 2500;

  let menu: Menu;

  beforeEach(() => {
    menu = new Menu(OPTION, PRICE);
  });

  it('has a menu option number', () => {
    expect(menu.option()).toBe(OPTION);
  });

  it('has a price', () => {
    expect(menu.price()).toBe(PRICE);
  });
});
