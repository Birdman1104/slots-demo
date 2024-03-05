import { lego } from '@armathai/lego';
import { Container, NineSlicePlane, Text } from 'pixi.js';
import { DEFAULT_FONT } from '../../Config';
import { getMinusButtonConfig, getPlusButtonConfig } from '../../configs/buttonsConfig/BetAmountChangeButtons';
import { getMaxBetButtonConfig } from '../../configs/buttonsConfig/MaxBetButtonConfig';
import { getSpinButtonConfig } from '../../configs/buttonsConfig/SpinButtonConfig';
import { ButtonEvents } from '../../enums/Enums';
import { UIEvents } from '../../events/MainEvents';
import { PlayerModelEvents, SlotMachineModelEvents } from '../../events/ModelEvents';
import { SlotMachineState } from '../../models/SlotMachineModel';
import { Button } from '../../utils/Button';
import { getNineSlice } from '../../utils/Utils';

export class BottomBar extends Container {
    private bkg: NineSlicePlane;
    private totalWinBkg: NineSlicePlane;
    private balanceBkg: NineSlicePlane;
    private plusButton: Button;
    private minusButton: Button;
    private spinButton: Button;
    private betAmountText: Text;
    private winAmountText: Text;
    private winnings: number;

    constructor() {
        super();

        lego.event.on(PlayerModelEvents.BetUpdate, this.onPlayerBetUpdate, this);
        lego.event.on(SlotMachineModelEvents.StateUpdate, this.onSlotMachineStateUpdate, this);
        lego.event.on(SlotMachineModelEvents.SpinResultUpdate, this.onSpinResultUpdate, this);

        this.build();
    }

    private onPlayerBetUpdate(newBet: number): void {
        this.betAmountText.text = `${newBet}`;
    }

    private onSlotMachineStateUpdate(newState: SlotMachineState): void {
        this.spinButton.setInteractivity(newState === SlotMachineState.Idle);
        this.minusButton.setInteractivity(newState === SlotMachineState.Idle);
        this.plusButton.setInteractivity(newState === SlotMachineState.Idle);

        switch (newState) {
            case SlotMachineState.ShowWinnings:
                this.updateWinningsText();
                break;
            case SlotMachineState.Idle:
                this.winnings = 0;
                this.updateWinningsText();
                break;
            default:
                break;
        }
    }

    private onSpinResultUpdate(result: SpinResult): void {
        this.winnings = result.totalWin;
    }

    private build(): void {
        this.buildBkg();
        this.buildBetMinusButton();
        this.buildBetAmount();
        this.buildBetPlusButton();
        this.buildSpinButton();
        this.buildWinnings();
        this.buildMaxBetButton();
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

    private buildBetPlusButton(): void {
        const button = new Button(getPlusButtonConfig());
        button.on(ButtonEvents.Up, () => lego.event.emit(UIEvents.PlusButtonClick));
        button.position.set(this.balanceBkg.x + this.balanceBkg.width + 60, 0);
        this.plusButton = button;
        this.addChild(this.plusButton);
    }

    private buildBetMinusButton(): void {
        const button = new Button(getMinusButtonConfig());
        button.on(ButtonEvents.Up, () => lego.event.emit(UIEvents.MinusButtonClick));
        button.position.set(-850, 0);
        this.minusButton = button;
        this.addChild(this.minusButton);
    }

    private buildBetAmount(): void {
        const nineSliceConfig: NineSliceConfig = {
            l: 34,
            r: 34,
            t: 42,
            b: 42,
            width: 256,
            height: 128,
        };
        const { width: w, height: h } = nineSliceConfig;

        const bkg = getNineSlice('dark_brown_field.png', nineSliceConfig);
        const betAmount = new Text('10', {
            fontFamily: DEFAULT_FONT,
            fontSize: 36,
            fill: 0xffffff,
            align: 'center',
        });
        const betText = new Text('BET', {
            fontFamily: DEFAULT_FONT,
            fontSize: 32,
            fill: 0xcccccc,
            align: 'center',
        });

        betAmount.anchor.set(0.5);
        betAmount.position.set(w / 2, h / 2 + 20);

        betText.anchor.set(0.5);
        betText.position.set(w / 2, 30);

        bkg.position.set(this.minusButton.x + this.minusButton.width / 2 + 10, -h / 2);
        bkg.addChild(betAmount);
        bkg.addChild(betText);

        this.balanceBkg = bkg;
        this.betAmountText = betAmount;

        this.addChild(this.balanceBkg);
    }

    private buildSpinButton(): void {
        const button = new Button(getSpinButtonConfig());
        button.on(ButtonEvents.Up, () => lego.event.emit(UIEvents.SpinButtonClick));
        button.position.set(800, 0);
        this.spinButton = button;
        this.addChild(this.spinButton);
    }

    private buildWinnings(): void {
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
        const winAmount = new Text('0', {
            fontFamily: DEFAULT_FONT,
            fontSize: 36,
            fill: 0xffffff,
            align: 'center',
        });
        const betText = new Text('TOTAL WINNINGS', {
            fontFamily: DEFAULT_FONT,
            fontSize: 32,
            fill: 0xcccccc,
            align: 'center',
        });

        winAmount.anchor.set(0.5);
        winAmount.position.set(w / 2, h / 2 + 20);

        betText.anchor.set(0.5);
        betText.position.set(w / 2, 30);

        bkg.position.set(-w / 2, -h / 2);
        bkg.addChild(winAmount);
        bkg.addChild(betText);

        this.totalWinBkg = bkg;
        this.winAmountText = winAmount;

        this.addChild(this.totalWinBkg);
    }

    private buildMaxBetButton(): void {
        const { x: twX, width: twW } = this.totalWinBkg;
        const { x: sbX, width: sbW } = this.spinButton;
        const x = twX + twW + (sbX - sbW / 2 - twX - twW) / 2;
        const button = new Button(getMaxBetButtonConfig());
        button.on(ButtonEvents.Up, () => lego.event.emit(UIEvents.MaxBetButtonClick));
        button.position.set(x, 0);
        this.plusButton = button;
        this.addChild(this.plusButton);
    }

    private updateWinningsText(): void {
        this.winAmountText.text = `${this.winnings}`;
    }
}
