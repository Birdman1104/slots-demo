import { Container, Rectangle, Sprite } from 'pixi.js';
import { HEIGHT, WIDTH } from '../Config';
import { ElementModel } from '../models/ElementModel';

export class ElementView extends Container {
    private _uuid: string;
    private _type: string;
    private element: Sprite;
    private blurEnabled: boolean = false;

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

    // public setY(value: number): void {
    //     console.warn('y', this.y, 'value', value);
    //     this.y = value + this.height;
    // }

    public blur(): void {
        console.warn('blur element ', this.uuid);
        // this._blur = true;
        // const texture = searchAtlasByFrame(`element/symbol_blur_${this._type + 1}.png`);
        // this._element.loadTexture(texture.key, texture.frame);
    }

    public unBlur(): void {
        console.warn('unblur element ', this.uuid);
        // this._blur = false;
        // const texture = searchAtlasByFrame(`element/symbol_${this._type + 1}.png`);
        // this._element.loadTexture(texture.key, texture.frame);
    }

    public loopHandler(): void {
        this.emit(`onElementLoop`, this.uuid);
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
