import { ObservableModel } from './ObservableModel';

export class PlayerModel extends ObservableModel {
    private _balance: number;
    private _bet: number;

    public constructor() {
        super('PlayerModel');
        this._balance = 18388566;
        this._bet = 0;

        this.makeObservable();
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

    get bet() {
        return this._bet;
    }

    set bet(value) {
        this._bet = value;
    }
}
