import { Container, Rectangle, Sprite } from 'pixi.js';
import { HEIGHT, WIDTH } from '../Config';
import { SlotModel } from '../models/SlotModel';

export class SlotView extends Container {
    private _uuid: string;
    private _type: number;
    private slot: Sprite;
    private blurEnabled: boolean = false;

    constructor(config: SlotModel) {
        super();

        this._uuid = config.uuid;
        this._type = config.type;

        this.updateDimensions();
        this.buildSlot();
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
        console.warn('blur slot ', this.uuid);
        // this._blur = true;
        // const texture = searchAtlasByFrame(`slot/symbol_blur_${this._type + 1}.png`);
        // this._slot.loadTexture(texture.key, texture.frame);
    }

    public unBlur(): void {
        console.warn('unblur slot ', this.uuid);
        // this._blur = false;
        // const texture = searchAtlasByFrame(`slot/symbol_${this._type + 1}.png`);
        // this._slot.loadTexture(texture.key, texture.frame);
    }

    public loopHandler(): void {
        this.emit(`onSlotLoop`, this.uuid);
    }

    public setType(value: number): void {
        this._type = value;

        this.buildSlot();
        this.updateDimensions();
    }

    private buildSlot(): void {
        this.slot && this.slot.destroy();

        this.slot = Sprite.from(`item_${this._type}.png`);
        this.slot.anchor.set(0.5);
        this.addChild(this.slot);
    }

    private updateDimensions(): void {
        // TODO Fix this config
        this.width = WIDTH;
        this.height = HEIGHT;
    }
}
