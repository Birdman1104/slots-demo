import { lego } from '@armathai/lego';
import { Container, Sprite, Text } from 'pixi.js';
import { UIEvents } from '../events/MainEvents';
import { PlayerModelEvents } from '../events/ModelEvents';

export class BetControllerView extends Container {
    private _plusButton: Sprite;
    private _minusButton: Sprite;
    private _spinButton: Sprite;
    private _balance: Sprite;
    private _betAmount: Text;

    constructor() {
        super();

        lego.event.on(PlayerModelEvents.BetUpdate, this.onPlayerBetUpdate, this);

        this.build();
    }

    private onPlayerBetUpdate(newBet: number): void {
        this._betAmount.text = `${newBet}`;
    }

    private build(): void {
        this.buildBetButton();
        this.buildBetPlusButton();
        this.buildBetMinusButton();
        this.buildBalance();
    }

    private buildBetButton(): void {
        const button = Sprite.from('spin_btn_up.png');
        const text = new Text('SPIN', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x5555aa,
            align: 'center',
        });
        text.anchor.set(0.5);
        button.anchor.set(0.5);
        button.addChild(text);
        button.eventMode = 'static';
        button.on('pointerdown', () => lego.event.emit(UIEvents.SpinButtonClick));
        this._spinButton = button;
        this.addChild(this._spinButton);
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
        bkg.position.set(0, -this._spinButton.height);
        bkg.addChild(betAmount);
        bkg.addChild(betText);
        this._balance = bkg;
        this._betAmount = betAmount;
        this.addChild(this._balance);
    }

    private buildBetPlusButton(): void {
        const button = Sprite.from('bet_plus_btn_up.png');
        button.anchor.set(1, 0.5);
        button.position.set(-this._spinButton.width / 2, 0);
        button.eventMode = 'static';
        button.on('pointerdown', () => lego.event.emit(UIEvents.PlusButtonClick));
        this._plusButton = button;
        this.addChild(this._plusButton);
    }

    private buildBetMinusButton(): void {
        const button = Sprite.from('bet_minus_btn_up.png');
        button.anchor.set(0, 0.5);
        button.position.set(this._spinButton.width / 2, 0);
        button.eventMode = 'static';
        button.on('pointerdown', () => lego.event.emit(UIEvents.MinusButtonClick));
        this._minusButton = button;
        this.addChild(this._minusButton);
    }
}
