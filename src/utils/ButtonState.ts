import { Container, Rectangle, Sprite, Text } from 'pixi.js';
import { ButtonStateNames } from '../enums/Enums';

export class ButtonState extends Container {
    private bkg: Sprite;
    private text?: Text;

    public constructor(private buttonStateConfig: ButtonStateConfig, public name: ButtonStateNames) {
        super();

        this.build();
    }

    public getBounds(): Rectangle {
        const { width, height } = this.bkg.getBounds();
        return new Rectangle(0, 0, width, height);
    }

    public updateText(text: string | number): void {
        if (this.text) this.text.text = text.toString();
    }

    private build(): void {
        const { image, tint, textConfig } = this.buttonStateConfig;
        this.buildBkg(image, tint);
        if (textConfig) this.buildText(textConfig);
    }

    private buildBkg(image: string, tint: number | undefined): void {
        this.bkg = Sprite.from(image);
        this.bkg.anchor.set(0.5);
        if (tint) this.bkg.tint = tint;
        this.addChild(this.bkg);
    }

    private buildText({ text, style, x, y }: TextConfig): void {
        console.warn('texxt');

        this.text = new Text(text, style);
        this.text.anchor.set(0.5);
        this.text.position.set(x || 0, y || 0);
        this.addChild(this.text);
    }
}
