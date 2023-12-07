import { last, sample } from '../Utils';
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
    // private _spinResult: any = null;
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

    // get spinResult() {
    //     return this._spinResult;
    // }

    // set spinResult(value) {
    //     this._spinResult = value;
    // }

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

    private generateReels(): ReelModel[] {
        return this._config.reels.map((reelConfig) => new ReelModel(reelConfig));
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

    public spin(): void {
        this._state = SlotMachineState.Spin;
        // await
    }

    public stop(): void {
        this._state = SlotMachineState.Stop;

        this._reels.forEach((r, i) => {
            r.state = ReelState.Stop;
            // delayRunnable(i * this._config.reelsStopDelay, r.setState, r, ReelState.Stop),
        });
    }

    public idle(): void {
        this.state = SlotMachineState.Idle;
    }

    public resetElements(shuffleAfterReset: boolean): void {
        const { reels } = this.config;

        reels.forEach(({ elements }, i) => {
            const reelModel = this._reels[i];
            const elTypes = [...elements];
            // shuffleAfterReset && shuffle(elTypes);
            elTypes.forEach((t, j) => (reelModel.elements[j].type = t));
        });
    }

    public startAutoSpinTimer(): void {
        // TODO ?
        // this._autoSpinTimer = delayRunnable(100, this.spin, this);
    }

    public stopAutoSpinTimer(): void {
        // removeRunnable(this._autoSpinTimer);
    }

    public setSpinResult(bet: number) {
        // this._spinResult = this.generateSpinResult(bet);
        // this._spinResult.reels.forEach((r, i) => r.forEach((s) => this._reels[i].setSlotTypeByIndex(s.index, s.type)));
    }

    public getWinType(): void {
        // public getWinType(): SpinResultType {
        // const rnd = Math.random();
        // if (rnd * 100 > CHANCE_TO_WIN) {
        //     return SpinResultType.Lose;
        // }
        // return this._spinsCount > 1 ? SpinResultType.Big : SpinResultType.Regular;
    }

    public getPrize(winType: SpinResultType, bet: number): number {
        return winType === SpinResultType.Lose ? 0 : this._config.prizeFactor[winType] * bet;
    }

    // TODO fix return type
    public getResultPattern(winType: SpinResultType): any {
        return sample(this._config.combinations[winType]);
    }

    private generateSpinResult(bet: number) {
        // const type = this.getWinType();
        // const prize = this.getPrize(type, bet);
        // const pattern = this.getResultPattern(type);
        // const reels = this.getReelsResultPattern(pattern);
        // return { type, prize, pattern, reels };
    }

    // TODO fix return and argument type
    private getReelsResultPattern(pattern: any): any {
        const winType = sample([0, 1, 2, 4]);

        return pattern.map((reelPattern, _reelIndex) =>
            reelPattern.map((elIndex) => ({ index: elIndex, type: winType })),
        );
    }
}
