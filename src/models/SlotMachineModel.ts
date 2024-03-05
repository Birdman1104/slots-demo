import { spin } from '../slotLogic';
import { last } from '../utils/Utils';
import { ObservableModel } from './ObservableModel';
import { ReelModel } from './ReelModel';

export enum SlotMachineState {
    Unknown,
    Idle,
    DropOld,
    WaitingForResult,
    DropNew,
    ShowWinLines,
    ShowWinnings,
}

export class SlotMachineModel extends ObservableModel {
    private _config: any = {};
    private _reels: ReelModel[] = [];
    private _state: SlotMachineState;
    private canCheck = false;
    private _spinResult: SpinResult = {
        winningInfo: [
            {
                coefficient: 0,
                count: 0,
                id: '',
                winAmount: 0,
                line: [],
            },
        ],
        totalWin: 0,
        reels: [],
    };
    private tempSpinResult: SpinResult;
    private isResultReady = false;

    public constructor(config: any) {
        super('SlotMachineModel');
        this._config = config;
        this._reels = this.generateReels();
        this.state = SlotMachineState.Unknown;

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

    set config(value) {
        this._config = value;
    }

    get reels() {
        return this._reels;
    }

    set reels(value) {
        this._reels = value;
    }

    get spinResult() {
        return this._spinResult;
    }

    set spinResult(value) {
        this._spinResult = value;
    }

    public init(): void {
        //
    }

    public setState(state: SlotMachineState): void {
        this.state = state;
    }

    public destroy(): void {
        //
    }

    public isLastReel(uuid: string): boolean {
        return last(this._reels).uuid === uuid;
    }

    public getReelIndex(uuid: string): number {
        return this._reels.indexOf(this._reels.find((r) => r.uuid === uuid) as ReelModel);
    }

    public getReelByUUID(uuid: string): ReelModel | undefined {
        return this._reels.find((r) => r.uuid === uuid);
    }

    public spin(bet: number | undefined): void {
        // TODO check for NaN values
        if (isNaN(bet as number)) return;
        this.state = SlotMachineState.DropOld;
        this.isResultReady = false;
        this.getSpinResult(bet);
    }

    public checkForResult(): void {
        if (this.isResultReady && this.state === SlotMachineState.WaitingForResult) {
            this.isResultReady = false;
            this.setNewElementsToReels(this.tempSpinResult.reels);
            this.setResult(this.tempSpinResult);
            setTimeout(() => {
                // TODO FIX THIS SHIT, needs to skip a frame then seet to new state
                this.state = SlotMachineState.DropNew;
            }, 0);
        } else {
            this.canCheck = true;
        }
    }
    public idle(): void {
        this.state = SlotMachineState.Idle;
    }
    public setResult(spinResult: SpinResult): void {
        this._spinResult = spinResult;
        this._config = { reels: spinResult.reels };
    }

    private generateReels(config = this._config): ReelModel[] {
        return config.reels.map((reelConfig, index) => new ReelModel(reelConfig, index));
    }

    private async getSpinResult(bet): Promise<void> {
        this.tempSpinResult = await spin(bet as number);
        this.isResultReady = true;
        this.canCheck && this.checkForResult();
    }

    private setNewElementsToReels(result: ReelsResult): void {
        this.reels.forEach((reel, i) => reel.setNewElements(result[i]));
    }
}
