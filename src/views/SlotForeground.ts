import { Container, Sprite, Text } from 'pixi.js';

export class SlotForeground extends Container {
    private winBanner: Sprite;

    constructor() {
        super();
        this.build();
    }

    public showWin(winAmount): void {
        const win = new Text(`${winAmount}`, {
            fontFamily: 'Arial',
            fontSize: 128,
            fill: '#ffffff',
        });
        win.anchor.set(0.5);
        win.position.set(this.winBanner.width / 2, this.winBanner.height / 2 + 180);
        this.addChild(win);

        this.winBanner.alpha = 1;

        setTimeout(() => {
            this.winBanner.alpha = 0;
            win.destroy();
            this.emit('winBoardShowComplete');
        }, 500);
    }

    private build(): void {
        this.winBanner = Sprite.from('you_win.png');
        this.addChild(this.winBanner);
    }

    public hideEverything(): void {
        [this.winBanner].forEach((child) => (child.alpha = 0));
    }
}
