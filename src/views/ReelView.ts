import { lego } from '@armathai/lego';
import { Container, Graphics, Rectangle } from 'pixi.js';
// import { SLOT_OFFSET, SPEED, SPIN_EASING, STOP_EASING } from '../Config';
import { OFFSET_Y, WIDTH } from '../Config';
import { ElementModelEvents } from '../events/ModelEvents';
import { ElementModel } from '../models/ElementModel';
import { ReelModel } from '../models/ReelModel';
import { ElementView } from './ElementView';

export class ReelView extends Container {
    private _uuid: String;
    // private offset = SLOT_OFFSET;
    // private speed = SPEED;
    // private loopRunnable: any; // TODO fix types
    // private spinRunnable: any;
    // private stopRunnable: any;
    // private loopStep: number;
    private _elements: ElementView[];
    private _tileY = 0;
    private rHeight = 0;

    constructor(model: ReelModel) {
        super();
        const { elements, uuid } = model;
        this._uuid = uuid;

        this.build(elements);
        lego.event.on(ElementModelEvents.TypeUpdate, this.elementTypeUpdate, this);
    }

    get uuid() {
        return this._uuid;
    }

    get elements() {
        return this._elements;
    }

    get tileY() {
        return this._tileY;
    }

    set tileY(value) {
        this._tileY = value;
        this.updateElementsPositions();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, WIDTH, this.calculateHeight());
    }

    public getElementByUUID(uuid: string): ElementView | undefined {
        return this._elements.find((el) => el.uuid === uuid);
    }

    public getElementByIndex(index: number): ElementView {
        return this.elements[index];
    }

    public blur(): void {
        this._elements.forEach((s) => s.blur());
    }

    public unBlur(): void {
        this._elements.forEach((s) => s.unBlur());
    }

    public stop(): void {
        // removeRunnable(this.loopRunnable);
        // this.unBlur();
        // const diff = this._height - (this._tileY % this._height);
        // const points = getTweenPoints(this.speed, STOP_EASING, this._tileY, diff + this._height);
        // this.stopRunnable = this.loopRunnable(0, () => {
        //     this._tileY = points.shift() as number;
        //     if (!points.length) {
        //         removeRunnable(this.stopRunnable);
        //         lego.event.emit(ReelViewEvents.SlowDownComplete, this._uuid);
        //     }
        // });
    }

    public spin(): void {
        this._elements.forEach((el) => {
            // el.tw;
        });
        // const points = getTweenPoints(this.speed, SPIN_EASING, this._tileY, this._height);
        // const lastPoints = points.slice(points.length - 2);
        // this.loopStep = lastPoints[1] - lastPoints[0];
        // this.spinRunnable = this.loopRunnable(0, () => {
        //     this.tileY = points.shift() as number;
        //     if (!points.length) {
        //         removeRunnable(this.spinRunnable);
        //         this.loop();
        //         lego.event.emit(ReelViewEvents.SpeedUpComplete, this._uuid);
        //     }
        // });
    }

    public destroy(): void {
        // removeRunnable(this.spinRunnable);
        // removeRunnable(this.stopRunnable);
        // removeRunnable(this.loopRunnable);

        super.destroy();
    }

    private elementTypeUpdate(newType: string, oldType: number, uuid: string): void {
        const elView = this.getElementByUUID(uuid);
        if (!elView) {
            return;
        }

        elView.once('onElementLoop', () => {
            elView.setType(newType);
            this._height = this.calculateHeight();
        });
    }

    private build(elements: ElementModel[]): void {
        this.buildElements(elements);
        this.rHeight = this.calculateHeight();
        this.updateElementsPositions();

        const gr = new Graphics();
        gr.beginFill(0xff0000, 0.5);
        gr.drawRect(0, 0, this.width, this.height);
        gr.endFill();
        this.addChild(gr);
    }

    private buildElements(elements: ElementModel[]): void {
        this._elements = elements.map((config) => {
            const element = new ElementView(config);
            element.on('onElementLoop', this.onElementLoop, this);
            this.addChild(element);
            return element;
        });
    }

    private onElementLoop(uuid: string): void {
        this.elements[0].uuid === uuid && this.emit('onReelLoop', this.uuid);
    }

    private calculateHeight(): number {
        return this._elements.reduce((acc, cur) => acc + cur.height + OFFSET_Y, 0) - OFFSET_Y;
    }

    private loop(): void {
        // this.loopRunnable = this.loopRunnable(0, () => (this.tileY += this.loopStep));
    }

    private updateElementsPositions(): void {
        for (let i = 0; i < this._elements.length; i += 1) {
            const element = this._elements[i];

            if (i === 0) {
                element.y = element.height / 2;
                element.x = element.width / 2;
            } else {
                const previews = this._elements[i - 1];
                element.y = previews.bottom + element.height / 2 + OFFSET_Y;
                element.x = element.width / 2;
            }

            // this.checkForLimits(element);
        }
    }

    private checkForLimits(element: ElementView): void {
        console.warn(`check for limits`);

        if (element.bottom > this.rHeight) {
            element.loopHandler();
            element.y = element.top - this.rHeight + element.height;
            // element.setY(element.top - this.rHeight);
        } else if (element.bottom < 0) {
            element.loopHandler();
            element.y = element.top + this.rHeight + element.height;
            // element.setY(element.top + this.rHeight);
        }
    }
}
