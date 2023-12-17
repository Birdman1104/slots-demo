import { lego } from '@armathai/lego';
import { Container, Rectangle } from 'pixi.js';
import { OFFSET_Y, WIDTH } from '../Config';
import { ElementModelEvents } from '../events/ModelEvents';
import { ElementModel } from '../models/ElementModel';
import { ReelModel } from '../models/ReelModel';
import { ElementView } from './ElementView';

export class ReelView extends Container {
    private _uuid: String;
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

    public animateElement(index: number): void {
        const element = this.getElementByIndex(index);
        element.scale.set(1.25);
    }

    public dimElements(): void {
        this.elements.forEach((e) => e.dim());
    }

    public resetAnimations(): void {
        this.elements.forEach((e) => e.reset());
    }

    public blur(): void {
        this._elements.forEach((s) => s.blur());
    }

    public unBlur(): void {
        this._elements.forEach((s) => s.unBlur());
    }

    public stop(): void {
        //
    }

    public spin(): void {
        this._elements.forEach((el) => {
            // el.tw;
        });
    }

    public destroy(): void {
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
        }
    }

    private checkForLimits(element: ElementView): void {
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
