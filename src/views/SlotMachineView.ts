import { lego } from '@armathai/lego';
import { Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import { OFFSET_X } from '../Config';
import { ReelModelEvents, SlotMachineModelEvents } from '../events/ModelEvents';
import { ReelState } from '../models/ReelModel';
import { SlotMachineModel, SlotMachineState } from '../models/SlotMachineModel';
import { ElementView } from './ElementView';
import { ReelView } from './ReelView';

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
        lego.event.on(SlotMachineModelEvents.ReelsUpdate, this.onReelsUpdate, this);
        lego.event.on(SlotMachineModelEvents.SpinResultUpdate, this.onSpinResultUpdate, this);
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
    }

    private buildBg(): void {
        //
    }

    private buildReels(): void {
        const { reels } = this.config;
        this.reelsContainer = new Container();
        this._reels = reels.map((model, i) => {
            const reel = new ReelView(model);
            reel.position.set(this.reelsContainer.width + (i !== 0 ? OFFSET_X : 0), 0);
            this.reelsContainer.addChild(reel);
            return reel;
        });
        this.reelsContainer.x = 128;
        this.addChild(this.reelsContainer);
    }

    private onStateUpdate(newState: SlotMachineState): void {
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
        const reel = this.getReelByUUID(uuid);
        switch (newState) {
            case ReelState.Spin:
                reel.spin();
                break;
            case ReelState.MaxSpeed:
                reel.blur();
                break;
            default:
        }
    }

    private onSpinResultUpdate(result: WinningInfo[]): void {
        if (result.length === 0) return;

        const linesData: { line: WinningLine; winningItemType: string }[] = result.map((r) => {
            return { line: r.line, winningItemType: r.id };
        });
        this.animateLines(linesData);
    }

    private onReelsUpdate(newReels: any, b, c): void {
        if (this._reels.length !== 0) {
            this._reels.forEach((r) => r.destroy());
            this._reels = [];
        }

        this._reels = newReels.map((model, i) => {
            const reel = new ReelView(model);
            reel.position.set(this.reelsContainer.width + (i !== 0 ? OFFSET_X : 0), 0);
            this.reelsContainer.addChild(reel);
            return reel;
        });
    }

    private stop(): void {
        //
    }

    private animateLines(lines: { line: WinningLine; winningItemType: string }[]): void {
        const getElements = (line) => line.map((pos, i) => this.reels[i].getElementByIndex(pos));
        const animationConfig: { elements: ElementView[]; winningItemType: string }[] = lines.map(
            ({ line, winningItemType }) => {
                return { elements: getElements(line), winningItemType };
            },
        );

        animationConfig.forEach(({ elements, winningItemType }, i) => {
            setTimeout(() => {
                this.reels.forEach((r) => r.dimElements());
                this.reels.forEach((r) => r.resetAnimations());
                elements.forEach((el) => el.animate(winningItemType));
            }, i * 3000 + 1000);

            if (i === animationConfig.length - 1) {
                setTimeout(() => {
                    this.reels.forEach((r) => r.clearElementsDim());
                    this.reels.forEach((r) => r.resetAnimations());
                }, (i + 1) * 3000 + 1000);
            }
        });
    }
}
