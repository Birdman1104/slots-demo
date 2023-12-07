import { ElementModel, ElementState } from './ElementModel';
import { ObservableModel } from './ObservableModel';

export enum ReelState {
    Idle,
    Spin,
    MaxSpeed,
    Stop,
}

export class ReelModel extends ObservableModel {
    private _state: ReelState;
    private _config: any;
    private _elements: ElementModel[];

    public constructor(config: any) {
        super('ReelModel');
        this._state = ReelState.Idle;
        this._config = config;
        // this._config = extendConfig(config);
        this._elements = this.generateElements();

        this.makeObservable();
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

    get elements() {
        return this._elements;
    }

    public setState(state: ReelState): void {
        this._state = state;
    }

    public getElementByUUID(uuid: string): ElementModel | undefined {
        return this._elements.find((el) => el.uuid === uuid);
    }

    public setElementStateByIndex(elIndex: number, state: ElementState): void {
        const el = this._elements[elIndex];
        if (el) {
            el.state = state;
        }
    }

    public setElementStateByUUID(uuid: string, state: ElementState): void {
        const el = this.getElementByUUID(uuid);
        if (el) {
            el.state = state;
        }
    }

    public setElementTypeByIndex(elIndex: number, type: string): void {
        const el = this._elements[elIndex];
        if (el) {
            el.type = type;
        }
    }

    public setElementTypeByUUID(uuid: string, type: string): void {
        const el = this.getElementByUUID(uuid);
        if (el) {
            el.type = type;
        }
    }

    private generateElements(): ElementModel[] {
        return this._config.elements.map((elType) => new ElementModel(elType));
    }
}
