import Priced from './priced';

class Menu implements Priced {
  constructor(private _option: number, private _price: number) {}

  option(): number {
    return this._option;
  }

  price(): number {
    return this._price;
  }
}

export default Menu;
