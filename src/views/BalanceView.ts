import { Container, Sprite, Text } from 'pixi.js';

export class BalanceView extends Container {
    private _balance: Text;

    constructor() {
        super();

        this.build();
    }

    private build(): void {
        this.buildBalance();
    }

    private buildBalance(): void {
        const bkg = Sprite.from('spin_btn_up.png');
        bkg.scale.set(1.3, 1);
        const balance = new Text('10', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x5555aa,
            align: 'center',
        });
        const balanceText = new Text('BALANCE -', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x5555aa,
            align: 'center',
        });
        balance.anchor.set(0.5);
        balanceText.anchor.set(0.5);
        balanceText.position.set(-30, 0);
        balance.position.set(60, 0);
        bkg.anchor.set(0.5);
        this.addChild(bkg);
        this.addChild(balance);
        this.addChild(balanceText);
    }
}
