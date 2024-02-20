import { lego } from '@armathai/lego';
import anime from 'animejs/lib/anime.js';
import { Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import { OFFSET_X } from '../Config';
import { ReelViewEvents, SlotMachineViewEvents } from '../events/MainEvents';
import { ReelModelEvents, SlotMachineModelEvents } from '../events/ModelEvents';
import { ElementModel } from '../models/ElementModel';
import { ReelState } from '../models/ReelModel';
import { SlotMachineModel, SlotMachineState } from '../models/SlotMachineModel';
import { ElementView } from './ElementView';
import { ReelView } from './ReelView';
import { SlotForeground } from './SlotForeground';

export class SlotMachineView extends Container {
    private bg: Sprite;
    private _reels: ReelView[];
    private reelsContainer: Container;
    private blocker: Graphics;
    private result: SpinResult;
    private foreground: SlotForeground;

    constructor(private config: SlotMachineModel) {
        super();

        this.build();

        lego.event.on(SlotMachineModelEvents.StateUpdate, this.onStateUpdate, this);
        lego.event.on(SlotMachineModelEvents.ReelsUpdate, this.onReelsUpdate, this);
        lego.event.on(SlotMachineModelEvents.SpinResultUpdate, this.onSpinResultUpdate, this);
        lego.event.on(ReelModelEvents.StateUpdate, this.onReelStateUpdate, this);
        lego.event.on(ReelModelEvents.ElementsUpdate, this.onReelElementsUpdate, this);

        // const gr = new Graphics();
        // gr.beginFill(0xff0000, 0.5);
        // gr.drawRect(0, 0, this.width, this.height);
        // gr.endFill();
        // this.addChild(gr);
    }

    get reels() {
        return this._reels;
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 1920, 1080);
    }

    public getReelByUUID(uuid: string): ReelView {
        return this._reels.find((reel) => reel.uuid === uuid) as ReelView;
    }

    private build(): void {
        this.buildBg();
        this.buildReels();

        this.buildForeground();
    }

    private buildBg(): void {
        this.bg = Sprite.from('main_background.jpg');
        this.addChild(this.bg);
    }

    private buildForeground(): void {
        this.foreground = new SlotForeground();
        this.foreground.hideEverything();

        this.foreground.on('winBoardShowComplete', () => {
            lego.event.emit(SlotMachineViewEvents.WinningsShowComplete);
        });
        this.addChild(this.foreground);
    }

    private buildReels(): void {
        const { reels } = this.config;
        this.reelsContainer = new Container();
        this._reels = reels.map((model, i) => {
            const reel = new ReelView(model);
            reel.on(ReelViewEvents.OldElementsDropComplete, this.onReelOldElementsDropComplete, this);
            reel.on(ReelViewEvents.NewElementsDropComplete, this.onReelNewElementsDropComplete, this);
            reel.position.set(this.reelsContainer.width + (i !== 0 ? OFFSET_X : 0), 0);
            this.reelsContainer.addChild(reel);
            return reel;
        });
        this.reelsContainer.x = 290;
        this.reelsContainer.y = 105;
        this.addChild(this.reelsContainer);

        const gr = new Graphics();
        gr.beginFill(0xff0000, 0.5);
        gr.drawRect(
            this.reelsContainer.x,
            this.reelsContainer.y,
            this.reelsContainer.width,
            this.reelsContainer.height,
        );
        gr.endFill();
        this.addChild(gr);
        this.reelsContainer.mask = gr;
    }

    private onStateUpdate(newState: SlotMachineState): void {
        switch (newState) {
            case SlotMachineState.DropOld:
                this.dropOldElements();
                break;
            case SlotMachineState.DropNew:
                this.dropNewElements();
                break;
            case SlotMachineState.ShowWinLines:
                this.showWinLines();
                break;
            case SlotMachineState.ShowWinnings:
                this.showWinnings();
                break;
            default:
        }
    }

    private onReelStateUpdate(newState: ReelState, oldState: ReelState, uuid: string): void {
        // const reel = this.getReelByUUID(uuid);
        // const reelIndex = this.reels.indexOf(reel);
        // switch (newState) {
        //     case ReelState.DropOld:
        //         reel.dropOldElements(reelIndex * 200);
        //         break;
        //     default:
        // }
    }

    private onReelElementsUpdate(newValue: ElementModel[], oldValue: ElementModel[], uuid: string): void {
        const reel = this.getReelByUUID(uuid);
        reel.setNewElements(newValue);
    }

    private onSpinResultUpdate(result: SpinResult): void {
        console.warn(result);

        this.result = result;
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

    private dropOldElements(): void {
        this.reels.forEach((r, i) => r.dropOldElements(i * 100));
    }

    private dropNewElements(): void {
        this.reels.forEach((r, i) => r.dropNewElements(i * 100));
    }

    private onReelOldElementsDropComplete(uuid: string): void {
        const reel = this.getReelByUUID(uuid);
        const reelIndex = this.reels.indexOf(reel);
        if (reelIndex === 0) {
            lego.event.emit(SlotMachineViewEvents.OldElementsDropComplete);
        }
    }

    private onReelNewElementsDropComplete(uuid: string): void {
        const reel = this.getReelByUUID(uuid);
        const reelIndex = this.reels.indexOf(reel);
        if (reelIndex === this.reels.length - 1) {
            lego.event.emit(SlotMachineViewEvents.NewElementsDropComplete);
        }
    }

    private showWinnings() {
        if (this.result.totalWin === 0) {
            lego.event.emit(SlotMachineViewEvents.WinningsShowComplete);
            return;
        }

        this.foreground.showWin(this.result.totalWin);
    }

    private showWinLines(): void {
        if (this.result.winningInfo.length === 0) {
            lego.event.emit(SlotMachineViewEvents.WinLinesShowComplete);
        }

        const linesData: { line: WinningLine; winningItemType: string }[] = this.result.winningInfo.map((r) => {
            return { line: r.line, winningItemType: r.id };
        });

        this.animateLines(linesData);
    }

    private animateLines(lines: { line: WinningLine; winningItemType: string }[]): void {
        const getElements = (line) => line.map((pos, i) => this.reels[i].getElementByIndex(pos));
        const animationConfig: { elements: ElementView[]; winningItemType: string }[] = lines.map(
            ({ line, winningItemType }) => {
                return { elements: getElements(line), winningItemType };
            },
        );
        if (animationConfig.length === 0) return;
        const animations: any[] = [];
        const playNextAnimation = (index: number, animations: any[]): void => {
            if (!animations[index]) {
                lego.event.emit(SlotMachineViewEvents.WinLinesShowComplete);
                return;
            }
            animations[index].play();
            animations[index].complete = () => playNextAnimation(index + 1, animations);
        };

        animationConfig.forEach(({ elements, winningItemType }, i) => {
            const timeline = anime.timeline({
                duration: 800,
                easing: 'easeInBack',
                direction: 'alternate',
                autoplay: false,
            });
            elements.forEach((e) => {
                timeline.add(
                    {
                        targets: e.scale,
                        x: 1.35,
                        y: 1.35,
                    },
                    0,
                );
            });
            animations.push(timeline);
        });

        playNextAnimation(0, animations);
    }
}
