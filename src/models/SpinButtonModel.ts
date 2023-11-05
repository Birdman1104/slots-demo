import { ObservableModel } from './ObservableModel';

export enum SpinButtonState {
    Spin,
    Stop,
}

export class SpinButtonModel extends ObservableModel {
    private _state: SpinButtonState;
    private _active = true;

    public constructor() {
        super('SpinButtonModel');
        this._state = SpinButtonState.Spin;

        this.makeObservable();
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }
}
