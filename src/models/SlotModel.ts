import { ObservableModel } from './ObservableModel';

export enum SlotState {
    Idle,
    Animation,
}

export class SlotModel extends ObservableModel {
    private _state: SlotState;
    private _type: number;

    public constructor(type: number) {
        super('SlotModel');
        this._state = SlotState.Idle;
        this._type = type;

        this.makeObservable();
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}
