import { lego } from '@armathai/lego';
import { Container, Sprite, Text } from 'pixi.js';
import { PlayerModelEvents } from '../events/ModelEvents';

export class BalanceView extends Container {
    private balance: Text;

    constructor() {
        super();

        lego.event.on(PlayerModelEvents.BalanceUpdate, this.balanceUpdate, this);
        this.build();
    }

    private balanceUpdate(newBalance: number): void {
        this.balance.text = newBalance;
    }

    private build(): void {
        this.buildBalance();
    }

    private buildBalance(): void {
        const bkg = Sprite.from('spin_btn_up.png');
        bkg.scale.set(1.3, 1);
        const balance = new Text('0', {
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
        this.addChild((this.balance = balance));
        this.addChild(balanceText);
    }
}
