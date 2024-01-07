import { Container, Rectangle } from 'pixi.js';
import { ButtonEvents, ButtonStateNames } from '../enums/Enums';
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

    public updateLabel(label: string | number): void {
        // changes label ON ALL STATES
        Object.keys(this.states).forEach((el) => {
            this.states[el]?.updateText(label);
        });
    }

    public updateLabelOnState(stateName: ButtonStateNames, label: string | number): void {
        // changes label ON SPECIFIC STATES
        Object.keys(this.states).forEach((el) => {
            if (this.states[el]?.name === stateName) {
                this.states[el]?.updateText(label);
            }
        });
    }

    public setInteractivity(value: boolean, disableVisually = false): void {
        // DisableVisually still keeps pointerUp event. But the btn looks disabled
        // Applies only if the btn is being disabled
        if (this.canClick === value) return;
        this.canClick = value;
        if (value) {
            this.enableInputs();
            this.setActiveState(ButtonStateNames.Up);
        } else {
            this.disableInputs(disableVisually);
            this.states.disabled && this.setActiveState(ButtonStateNames.Disabled);
        }
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

        this.enableInputs();
    }

    private enableInputs(): void {
        this.disableInputs();
        this.on('pointerdown', this.onPointerDown, this);
        this.on('pointerup', this.onPointerUp, this);
        this.on('pointerover', this.onPointerOver, this);
        this.on('pointerout', this.onPointerOut, this);
    }

    private disableInputs(disableOnlyVisually = false): void {
        !disableOnlyVisually && this.off('pointerup', this.onPointerUp, this);
        this.off('pointerdown', this.onPointerDown, this);
        this.off('pointerover', this.onPointerOver, this);
        this.off('pointerout', this.onPointerOut, this);
    }

    private onPointerDown(): void {
        this.emit(ButtonEvents.Down);
        this.setActiveState(ButtonStateNames.Down);
    }

    private onPointerUp(): void {
        this.emit(ButtonEvents.Up);
        !this.isDisabled && this.setActiveState(ButtonStateNames.Up);
    }

    private onPointerOver(): void {
        this.emit(ButtonEvents.Over);
        this.setActiveState(ButtonStateNames.Over);
    }

    private onPointerOut(): void {
        this.setActiveState(ButtonStateNames.Up);
        this.emit(ButtonEvents.Out);
    }
}
