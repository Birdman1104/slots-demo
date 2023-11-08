import { lego } from '@armathai/lego';
import { Container, Graphics, Sprite } from 'pixi.js';
import { delayRunnable } from '../Utils';
import { SlotMachineEffectsEvents, SlotMachineViewEvents } from '../events/MainEvents';
import { ReelModelEvents, SlotMachineModelEvents } from '../events/ModelEvents';
import { ReelState } from '../models/ReelModel';
import { SlotMachineModel, SlotMachineState } from '../models/SlotMachineModel';
import { ReelView } from './ReelView';

function getMaskGraphics(config = { alpha: 1, color: 0x0 }) {
    const { alpha, color } = config;
    const mask: { x: number; y: number }[] = [
        { x: 20, y: 20 },
        { x: 570, y: 20 },
        { x: 570, y: 540 },
        { x: 20, y: 540 },
    ];

    const gr = new Graphics();
    gr.beginFill(color, 1);
    gr.drawPolygon(mask);
    gr.endFill();

    gr.alpha = alpha;

    return gr;
}

export class SlotMachineView extends Container {
    private bg: Sprite;
    private _reels: ReelView[];
    private reelsGroup: Container;
    private blocker: Graphics;
    constructor(private config: SlotMachineModel) {
        super();

        this.build();

        lego.event.on(SlotMachineModelEvents.StateUpdate, this.onStateUpdate, this);
        lego.event.on(ReelModelEvents.StateUpdate, this.onReelStateUpdate, this);
        lego.event.on(SlotMachineEffectsEvents.SpinResultAnimationStart, this.onSpinResultAnimationStart, this);
        lego.event.on(SlotMachineEffectsEvents.SpinResultAnimationComplete, this.onSpinResultAnimationComplete, this);
    }

    get reels() {
        return this._reels;
    }

    public getReelByUUID(uuid: string): ReelView {
        return this._reels.find((reel) => reel.uuid === uuid) as ReelView;
    }

    private build(): void {
        this.buildBg();
        this.buildReels();
        this.buildBlocker();
    }

    private buildBg(): void {
        this.bg = Sprite.from('slot-bg.jpg');
        // this.bg.anchor.set(0.5);
        this.bg.scale.set(0.5);
        this.bg.eventMode = 'dynamic';
        this.bg.on('pointerdown', this.onBgClick, this);
        this.addChild(this.bg);
    }

    private buildReels(): void {
        const { reels } = this.config;
        this.reelsGroup = new Container();
        this._reels = reels.map((model) => {
            const { offset } = model.config;
            const reel = new ReelView(model);
            reel.position.set(this.reelsGroup.width + offset.x, offset.y);
            this.reelsGroup.addChild(reel);
            return reel;
        });
        // this.reelsGroup.x = this.bg.x;
        // this.reelsGroup.y = this.bg.y + 20;
        this.addChild((this.reelsGroup.mask = getMaskGraphics()));
        this.addChild(this.reelsGroup);
    }

    private buildBlocker() {
        this.blocker = this.addChild(getMaskGraphics({ alpha: 0.5, color: 0xff0000 }));
    }

    private onStateUpdate(newState: SlotMachineState): void {
        this.switchInputs(false);

        switch (newState) {
            case SlotMachineState.Idle:
                this.switchInputs(true);
                break;
            case SlotMachineState.Stop:
                this.stop();
                break;
            default:
        }
    }

    private onReelStateUpdate(newState: ReelState, oldState: ReelState, uuid: string): void {
        this.switchInputs(false);

        switch (newState) {
            case ReelState.Spin:
                this.getReelByUUID(uuid).spin();
                break;
            case ReelState.MaxSpeed:
                this.getReelByUUID(uuid).blur();
                break;
            default:
        }
    }

    private onSpinResultAnimationStart(): void {
        // TODO add blocker tween
        this.blocker.alpha = 0.8;
        // this.game.add.tween(this._blocker).to({ alpha: 0.4 }, 200, null, true);
    }

    private onSpinResultAnimationComplete(): void {
        this.blocker.alpha = 0;
        // TODO add blocker tween
        // this.game.add.tween(this._blocker).to({ alpha: 0.4 }, 200, null, true);
    }

    private stop(): void {
        this.setReelStopListener(0);
    }

    private setReelStopListener(reelIndex: number): void {
        delayRunnable(reelIndex * 10, () => {
            const reel = this.reels[reelIndex];
            reel.on('onReelLoop', () => {
                reel.stop();

                if (reelIndex < this.reels.length - 1) {
                    this.setReelStopListener(reelIndex + 1);
                }
            });
        });
    }

    private switchInputs(value: boolean): void {
        this.bg.eventMode = value ? 'dynamic' : 'none';
    }

    private onBgClick(): void {
        lego.event.emit(SlotMachineViewEvents.Spin);
    }
}
