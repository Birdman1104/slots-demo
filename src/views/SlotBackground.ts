import { Container, Sprite } from 'pixi.js';

export class SlotBackground extends Container {
    private staticBkg: Sprite;
    constructor() {
        super();
        this.build();
    }

    private build(): void {
        this.staticBkg = Sprite.from('slot_bkg.png');
        this.addChild(this.staticBkg);
    }
}
