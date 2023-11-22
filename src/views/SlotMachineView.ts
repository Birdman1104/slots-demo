import { lego } from '@armathai/lego';
import { Container, Graphics, Rectangle, Sprite } from 'pixi.js';
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
    private reelsContainer: Container;
    private blocker: Graphics;
    constructor(private config: SlotMachineModel) {
        super();

        this.build();

        lego.event.on(SlotMachineModelEvents.StateUpdate, this.onStateUpdate, this);
        lego.event.on(ReelModelEvents.StateUpdate, this.onReelStateUpdate, this);
        // lego.event.on(SlotMachineEffectsEvents.SpinResultAnimationStart, this.onSpinResultAnimationStart, this);
        // lego.event.on(SlotMachineEffectsEvents.SpinResultAnimationComplete, this.onSpinResultAnimationComplete, this);
    }

    get reels() {
        return this._reels;
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 1000, 1000);
    }

    public getReelByUUID(uuid: string): ReelView {
        return this._reels.find((reel) => reel.uuid === uuid) as ReelView;
    }

    private build(): void {
        this.buildBg();
        this.buildReels();
        // this.buildBlocker();
    }

    private buildBg(): void {
        const gr = new Graphics();
        gr.beginFill(0x0000ff, 0.5);
        gr.drawRect(0, 0, this.width, this.height);
        gr.endFill();
        this.addChild(gr);

        // this.bg = Sprite.from('slot-bg.jpg');
        // this.bg.scale.set(0.5);
        // this.bg.eventMode = 'dynamic';
        // this.bg.on('pointerdown', this.onBgClick, this);
        // this.addChild(this.bg);
    }

    private buildReels(): void {
        const { reels } = this.config;
        this.reelsContainer = new Container();
        this._reels = reels.map((model) => {
            // const { offset } = model.config;
            console.warn(model);

            const offset = { x: 0, y: 0 };
            const reel = new ReelView(model);
            // reel.position.set(this.reelsContainer.width + offset.x, HEIGHT / 2 + offset.y);
            reel.position.set(0, 0);
            this.reelsContainer.addChild(reel);
            return reel;
        });
        this.reelsContainer.x = 128;
        this.addChild(this.reelsContainer);
    }

    // private buildBlocker() {
    //     this.blocker = this.addChild(getMaskGraphics({ alpha: 0.5, color: 0xff0000 }));
    // }

    private onStateUpdate(newState: SlotMachineState): void {
        // this.switchInputs(false);

        switch (newState) {
            case SlotMachineState.Idle:
                // this.switchInputs(true);
                break;
            case SlotMachineState.Stop:
                this.stop();
                break;
            default:
        }
    }

    private onReelStateUpdate(newState: ReelState, oldState: ReelState, uuid: string): void {
        // this.switchInputs(false);

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

    // private onSpinResultAnimationStart(): void {
    //     // TODO add blocker tween
    //     this.blocker.alpha = 0.8;
    //     // this.game.add.tween(this._blocker).to({ alpha: 0.4 }, 200, null, true);
    // }

    // private onSpinResultAnimationComplete(): void {
    //     this.blocker.alpha = 0;
    //     // TODO add blocker tween
    //     // this.game.add.tween(this._blocker).to({ alpha: 0.4 }, 200, null, true);
    // }

    private stop(): void {
        // this.setReelStopListener(0);
    }

    // private setReelStopListener(reelIndex: number): void {
    //     delayRunnable(reelIndex * 10, () => {
    //         const reel = this.reels[reelIndex];
    //         reel.on('onReelLoop', () => {
    //             reel.stop();

    //             if (reelIndex < this.reels.length - 1) {
    //                 this.setReelStopListener(reelIndex + 1);
    //             }
    //         });
    //     });
    // }

    // private switchInputs(value: boolean): void {
    //     // this.bg.eventMode = value ? 'dynamic' : 'none';
    // }

    // private onBgClick(): void {
    //     lego.event.emit(SlotMachineViewEvents.Spin);
    // }
}
