import {Currency, ExchangeFn} from "./Exchange";


export class Wallet {
    constructor(public amount: number, public currency: Currency) { }

    convert(currencyTarget: Currency, convertionFunction: ExchangeFn) {
        return convertionFunction(this.amount, this.currency, currencyTarget)
    }
}

