import { Container, Rectangle } from 'pixi.js';
import { ButtonStateNames } from '../enums/Enums';
import { ButtonState } from './ButtonState';

export class Button extends Container {
    protected states: {
        up: ButtonState;
        over?: ButtonState;
        down?: ButtonState;
        disabled?: ButtonState;
    };
    protected activeState: ButtonStateNames;
    private canClick: boolean;

    public constructor(private buttonConfig: ButtonConfig) {
        super();

        this.build();
    }

    public get isDisabled(): boolean {
        return this.activeState === ButtonStateNames.Disabled;
    }

    public getBounds(): Rectangle {
        if (!this.isDisabled) {
            return this.states.up.getBounds();
        }
        return this.states.disabled ? this.states.disabled.getBounds() : this.states.up.getBounds();
    }

    private build(): void {
        this.createStates(this.buttonConfig.states);
        this.initHitArea();
    }

    private createStates(statesConfig: any): any {
        const { up, over, down, disabled } = statesConfig;
        this.states = {
            up: up && this.initState(up, ButtonStateNames.Up),
            over: over && this.initState(over, ButtonStateNames.Over),
            down: down && this.initState(down, ButtonStateNames.Down),
            disabled: disabled && this.initState(disabled, ButtonStateNames.Disabled),
        };
        // this.setButtonSize();
        this.setActiveState(ButtonStateNames.Up);
        this.canClick = true;
    }

    private initState(stateConfig: ButtonStateConfig, stateName: ButtonStateNames): ButtonState {
        const state = new ButtonState(stateConfig, stateName);
        this.addChild(state);
        return state;
    }

    protected setActiveState(stateName: ButtonStateNames): void {
        if (this.activeState === stateName) return;
        this.activeState = stateName;
        Object.keys(this.states).forEach((el) => {
            if (this.states[el]?.name === stateName) {
                this.states[el].visible = true;
            } else if (this.states[el] && this.states[el].name !== stateName) {
                this.states[el].visible = false;
            }
        });
    }

    private initHitArea(): void {
        const { width, height } = this.getBounds();
        const g2 = new Rectangle(-width / 2, -height / 2, width, height);
        this.hitArea = g2;
        this.eventMode = 'static';

        this.on('pointerdown', this.onPointerDown, this);
        this.on('pointerup', this.onPointerUp, this);
        this.on('pointerover', this.onPointerOver, this);
        this.on('pointerout', this.onPointerOut, this);
    }

    private onPointerDown(): void {
        console.warn(`Down`);
    }

    private onPointerUp(): void {
        console.warn(`Up`);
    }

    private onPointerOver(): void {
        console.warn(`Over`);
    }

    private onPointerOut(): void {
        console.warn(`Out`);
    }
}
