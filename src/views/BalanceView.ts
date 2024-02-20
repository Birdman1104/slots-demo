import { lego } from '@armathai/lego';
import { Container, Sprite, Text } from 'pixi.js';
import { DEFAULT_FONT } from '../Config';
import { SlotMachineViewEvents } from '../events/MainEvents';
import { PlayerModelEvents } from '../events/ModelEvents';

export class BalanceView extends Container {
    private tempBalance = 0;
    private balance: Text;

    constructor() {
        super();

        lego.event.on(PlayerModelEvents.BalanceUpdate, this.updateTempBalance, this);
        lego.event.on(SlotMachineViewEvents.WinningsShowComplete, this.updateBalance, this);
        lego.event.on(SlotMachineViewEvents.UpdateUIBalance, this.updateBalance, this);
        this.build();
    }

    private updateTempBalance(newBalance: number): void {
        this.tempBalance = newBalance;
    }

    private updateBalance(): void {
        this.balance.text = this.tempBalance;
    }

    private build(): void {
        this.buildBalance();
    }

    private buildBalance(): void {
        const bkg = Sprite.from('spin_btn_up.png');
        bkg.scale.set(1.3, 1);
        this.balance = new Text('0', {
            fontFamily: DEFAULT_FONT,
            fontSize: 18,
            fill: 0x5555aa,
            align: 'center',
        });
        const balanceText = new Text('BALANCE -', {
            fontFamily: DEFAULT_FONT,
            fontSize: 18,
            fill: 0x5555aa,
            align: 'center',
        });
        this.balance.anchor.set(0.5);
        balanceText.anchor.set(0.5);
        balanceText.position.set(-30, 0);
        this.balance.position.set(60, 0);
        bkg.anchor.set(0.5);
        this.addChild(bkg, this.balance, balanceText);
    }
}
