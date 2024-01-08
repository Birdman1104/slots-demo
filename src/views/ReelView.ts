import { lego } from '@armathai/lego';
import anime from 'animejs/lib/anime.js';
import { Container, Graphics, Rectangle } from 'pixi.js';
import { OFFSET_Y, WIDTH } from '../Config';
import { ElementModelEvents } from '../events/ModelEvents';
import { ElementModel } from '../models/ElementModel';
import { ReelModel } from '../models/ReelModel';
import { ElementView } from './ElementView';

export class ReelView extends Container {
    private _uuid: String;
    private _elements: ElementView[];
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

    public clearElementsDim(): void {
        this.elements.forEach((e) => e.clearDim());
    }

    public resetAnimations(): void {
        this.elements.forEach((e) => e.reset());
    }

    public dropOldElements(delay: number): void {
        let count = 0;
        this.elements.forEach((el, i) => {
            anime({
                targets: el,
                y: this.rHeight + el.height / 2,
                duration: 200 * (this.elements.length - i + 1),
                delay,
                easing: 'easeInBack',
                complete: () => {
                    el.destroy();
                    count++;
                    if (count === this.elements.length) {
                        this.emit(`dropComplete`, this.uuid);
                    }
                },
                update: (anim) => {
                    // blur element
                },
            });
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
            this.addChild(element);
            return element;
        });
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
}
