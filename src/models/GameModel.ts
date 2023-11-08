import { getSlotMachineConfig } from '../Config';
import { ObservableModel } from './ObservableModel';
import { SlotMachineModel } from './SlotMachineModel';

export enum GameState {
    Unknown,
}

export class GameModel extends ObservableModel {
    private _state: GameState;
    private _slotMachine: SlotMachineModel | null = null;

    constructor() {
        super('GameModel');
        this.makeObservable();
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get slotMachine() {
        return this._slotMachine;
    }

    set slotMachine(value) {
        this._slotMachine = value;
    }

    public init(): void {
        this.initializeMachineModel();
    }

    public destroy(): void {
        this.destroyMachineModel();
    }

    public idleSlotMachine(): void {
        if (this._slotMachine) {
            this._slotMachine.idle();
        }
    }

    private initializeMachineModel(): void {
        this._slotMachine = new SlotMachineModel(getSlotMachineConfig());
        this._slotMachine.init();
    }

    private destroyMachineModel(): void {
        (this._slotMachine as SlotMachineModel).destroy();
        this._slotMachine = null;
    }
}
