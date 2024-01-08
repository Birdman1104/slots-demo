import { Container, Rectangle, Sprite } from 'pixi.js';
import { HEIGHT, WIDTH } from '../Config';
import { ElementModel } from '../models/ElementModel';

export class ElementView extends Container {
    private _uuid: string;
    private _type: string;
    private element: Sprite;

    constructor(config: ElementModel) {
        super();

        this._uuid = config.uuid;
        this._type = config.type;

        this.updateDimensions();
        this.buildElement();
    }

    get uuid() {
        return this._uuid;
    }

    get type() {
        return this._type;
    }

    get top() {
        return this.y - this.height;
    }

    get bottom() {
        return this.y + this.height / 2;
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, WIDTH, HEIGHT);
    }

    public reset(): void {
        this.scale.set(1);
        this.alpha = 1;
    }

    public animate(winingItemType: string): void {
        this.clearDim();
        this.alpha = this.type === winingItemType ? 1 : 0.6;
        this.scale.set(1.3);
    }

    public dim(): void {
        this.element.tint = 0xababab;
    }

    public clearDim(): void {
        this.element.tint = 0xffffff;
    }

    public setType(value: string): void {
        this._type = value;

        this.buildElement();
        this.updateDimensions();
    }

    private buildElement(): void {
        this.element && this.element.destroy();

        this.element = Sprite.from(`${this._type}.png`);
        this.element.anchor.set(0.5);
        this.addChild(this.element);
    }

    private updateDimensions(): void {
        // TODO Fix this config
        this.width = WIDTH;
        this.height = HEIGHT;
    }
}
