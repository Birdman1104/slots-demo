import { lego } from '@armathai/lego';
import { Container, NineSlicePlane, Text } from 'pixi.js';
import { DEFAULT_FONT } from '../../Config';
import { SlotMachineViewEvents } from '../../events/MainEvents';
import { PlayerModelEvents } from '../../events/ModelEvents';
import { getNineSlice } from '../../utils/Utils';

export class TopBar extends Container {
    private bkg: NineSlicePlane;
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
        this.buildBkg();
        this.buildBalance();
    }

    private buildBkg(): void {
        const nineSliceConfig: NineSliceConfig = {
            l: 5,
            r: 5,
            t: 31,
            b: 158,
            width: 1920,
            height: 192,
        };
        this.bkg = getNineSlice('bar_tile.png', nineSliceConfig);
        this.addChild(this.bkg);
    }

    private buildBalance(): void {
        const nineSliceConfig: NineSliceConfig = {
            l: 34,
            r: 34,
            t: 42,
            b: 42,
            width: 512,
            height: 128,
        };
        const { width: w, height: h } = nineSliceConfig;

        const bkg = getNineSlice('dark_brown_field.png', nineSliceConfig);

        this.balance = new Text('0', {
            fontFamily: DEFAULT_FONT,
            fontSize: 36,
            fill: 0xffffff,
            align: 'center',
        });
        const balanceText = new Text('BALANCE', {
            fontFamily: DEFAULT_FONT,
            fontSize: 32,
            fill: 0xeeeeee,
            align: 'center',
        });

        this.balance.anchor.set(0.5);
        balanceText.anchor.set(0.5);
        balanceText.position.set(0, -32);
        this.balance.position.set(0, 20);
        this.addChild(bkg, this.balance, balanceText);
    }
}
