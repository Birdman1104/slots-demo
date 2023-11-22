import { ObservableModel } from './ObservableModel';
import { SlotModel, SlotState } from './SlotModel';

function extendConfig(config: any): any {
    const { offset } = config;
    config.offset = { x: offset.x || 0, y: offset.y || 0 };

    return config;
}

export enum ReelState {
    Idle,
    Spin,
    MaxSpeed,
    Stop,
}

export class ReelModel extends ObservableModel {
    private _state: ReelState;
    private _config: any;
    private _slots: SlotModel[];

    public constructor(config: any) {
        super('ReelModel');
        this._state = ReelState.Spin;
        this._config = config;
        // this._config = extendConfig(config);
        this._slots = this.generateSlots();

        this.makeObservable('_state');
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get config() {
        return this._config;
    }

    get slots() {
        return this._slots;
    }

    public setState(state: ReelState): void {
        this._state = state;
    }

    public getSlot(uuid: string): SlotModel | undefined {
        return this._slots.find((slot) => slot.uuid === uuid);
    }

    public setSlotStateByIndex(slotIndex: number, state: SlotState): void {
        const slot = this._slots[slotIndex];
        if (slot) {
            slot.state = state;
        }
    }

    public setSlotStateByUUID(uuid: string, state: SlotState): void {
        const slot = this.getSlot(uuid);
        if (slot) {
            slot.state = state;
        }
    }

    public setSlotTypeByIndex(slotIndex: number, type: number): void {
        const slot = this._slots[slotIndex];
        if (slot) {
            slot.type = type;
        }
    }

    public setSlotTypeByUUID(uuid: string, type: number): void {
        const slot = this.getSlot(uuid);
        if (slot) {
            slot.type = type;
        }
    }

    private generateSlots(): SlotModel[] {
        return this._config.slots.map((slotType) => new SlotModel(slotType));
    }
}
