import { getSpinResult } from '../slotLogic';
import { last } from '../utils/Utils';
import Head from './HeadModel';
import { ObservableModel } from './ObservableModel';
import { ReelModel, ReelState } from './ReelModel';

export enum SlotMachineState {
    Unknown,
    Idle,
    Spin,
    MaxSpeed,
    Action,
    Stop,
}

export enum SpinResultType {
    Big,
    Regular,
    Mega,
    Lose,
}

export class SlotMachineModel extends ObservableModel {
    private _config: any = {};
    private _reels: ReelModel[] = [];
    private _state: SlotMachineState;
    private _spinResult: WinningInfo[] = [
        {
            coefficient: 0,
            count: 0,
            id: '',
            winAmount: 0,
            line: [],
        },
    ];
    // private _spinsCount = 0;
    // private _spinButton: SpinButtonModel | null = null;
    // private _autoSpinTimer: any;

    public constructor(config: any) {
        super('SlotMachineModel');
        this._config = config;
        this._reels = this.generateReels();
        this._state = SlotMachineState.Unknown;

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

    // get spinsCount() {
    //     return this._spinsCount;
    // }

    // set spinsCount(value) {
    //     this._spinsCount = value;
    // }

    // get spinButton() {
    //     return this._spinButton;
    // }

    // set spinButton(value) {
    //     this._spinButton = value;
    // }

    public init(): void {
        // this._spinButton = new SpinButtonModel();
    }

    public destroy(): void {
        //
    }

    private generateReels(config = this._config): ReelModel[] {
        return config.reels.map((reelConfig, index) => new ReelModel(reelConfig, index));
    }

    public isLastReel(uuid: string): boolean {
        return last(this._reels).uuid === uuid;
    }

    public getReelIndex(uuid: string): number {
        return this._reels.indexOf(this._reels.find((r) => r.uuid === uuid) as ReelModel);
    }

    public getReel(uuid: string): ReelModel | undefined {
        return this._reels.find((r) => r.uuid === uuid);
    }

    public async spin(bet: number | undefined): Promise<void> {
        // TODO check for NaN values
        if (isNaN(bet as number)) return;
        this._state = SlotMachineState.Spin;
        const result = await getSpinResult(bet as number);
        // result.winningInfo.forEach((w) => console.warn(w));
        this._reels = this.generateReels(result);
        Head.playerModel?.updateBalance(result.totalWin);
        this.setResult(result);
    }

    public stop(): void {
        this._state = SlotMachineState.Stop;

        this._reels.forEach((r, i) => {
            r.state = ReelState.Stop;
        });
    }

    public idle(): void {
        this.state = SlotMachineState.Idle;
    }

    public setResult({ winningInfo, reels }: SpinResult): void {
        this._spinResult = winningInfo;
        this._config = { reels };
    }
}
