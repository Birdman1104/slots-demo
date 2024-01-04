import { BETS } from '../Config';
import { ObservableModel } from './ObservableModel';

export class PlayerModel extends ObservableModel {
    private _balance: number;
    private _bet: number;
    private _playerID: number;

    public constructor() {
        super('PlayerModel');
        this._balance = 0;
        this._bet = 0;

        this.makeObservable();
    }

    get playerID() {
        return this._playerID;
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

    public spin(): void {
        this._balance -= this._bet;
    }

    public increaseBet(): void {
        const index = BETS.findIndex((el) => el === this._bet);
        if (index === BETS.length - 1) return; // TODO disable button
        this._bet = BETS[index + 1];
    }

    public decreaseBet(): void {
        const index = BETS.findIndex((el) => el === this._bet);
        if (index === 0) return; // TODO disable button
        this._bet = BETS[index - 1];
    }

    public setPlayerInfo(playerInfo: any): void {
        this._bet = playerInfo.bet;
        this._balance = playerInfo.balance;
        this._playerID = playerInfo.id;
    }

    public updateBalance(winning: number): void {
        this._balance += winning;
    }
}
