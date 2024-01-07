import { lego } from '@armathai/lego';
import { Container, Sprite, Text } from 'pixi.js';
import { getMinusButtonConfig, getPlusButtonConfig } from '../configs/buttonsConfig/BetAmountChangeButtons';
import { getSpinButtonConfig } from '../configs/buttonsConfig/SpinButtonConfig';
import { ButtonEvents } from '../enums/Enums';
import { UIEvents } from '../events/MainEvents';
import { PlayerModelEvents } from '../events/ModelEvents';
import { Button } from '../utils/Button';

export class BetControllerView extends Container {
    private plusButton: Button;
    private minusButton: Button;
    private spinButton: Button;
    private balance: Sprite;
    private betAmount: Text;

    constructor() {
        super();

        lego.event.on(PlayerModelEvents.BetUpdate, this.onPlayerBetUpdate, this);

        this.build();
    }

    private onPlayerBetUpdate(newBet: number): void {
        this.betAmount.text = `${newBet}`;
    }

    private build(): void {
        this.buildBetButton();
        this.buildBetPlusButton();
        this.buildBetMinusButton();
        this.buildBalance();
    }

    private buildBetButton(): void {
        const button = new Button(getSpinButtonConfig());
        button.on(ButtonEvents.Up, () => lego.event.emit(UIEvents.SpinButtonClick));
        this.spinButton = button;
        this.addChild(this.spinButton);
    }

    private buildBalance(): void {
        const bkg = Sprite.from('spin_btn_up.png');
        const betAmount = new Text('10', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x5555aa,
            align: 'center',
        });
        const betText = new Text('BET - ', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x5555aa,
            align: 'center',
        });
        betAmount.anchor.set(0.5);
        betText.anchor.set(0.5);
        betText.position.set(-40, 0);
        betAmount.position.set(30, 0);
        bkg.anchor.set(0.5);
        bkg.position.set(0, -this.spinButton.height);
        bkg.addChild(betAmount);
        bkg.addChild(betText);
        this.balance = bkg;
        this.betAmount = betAmount;
        this.addChild(this.balance);
    }

    private buildBetPlusButton(): void {
        const button = new Button(getPlusButtonConfig());
        button.on(ButtonEvents.Up, () => lego.event.emit(UIEvents.PlusButtonClick));
        button.position.set(this.spinButton.width / 2 + button.width / 2, 0);

        this.plusButton = button;
        this.addChild(this.plusButton);
    }

    private buildBetMinusButton(): void {
        const button = new Button(getMinusButtonConfig());
        button.on(ButtonEvents.Up, () => lego.event.emit(UIEvents.MinusButtonClick));
        button.position.set(-this.spinButton.width / 2 - button.width / 2, 0);

        this.minusButton = button;
        this.addChild(this.minusButton);
    }
}
