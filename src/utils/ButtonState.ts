import { Container, NineSlicePlane, Rectangle, Sprite, Text, Texture } from 'pixi.js';
import { ButtonStateNames } from '../enums/Enums';

export class ButtonState extends Container {
    private bkg: Sprite | NineSlicePlane;
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
        const { textConfig, nineSliceConfig } = this.buttonStateConfig;

        if (nineSliceConfig) {
            this.buildNineSlice();
        } else {
            this.buildBkg();
        }
        if (textConfig) this.buildText(textConfig);
    }

    private buildBkg(): void {
        const { image, tint = undefined } = this.buttonStateConfig;
        this.bkg = Sprite.from(image);
        this.bkg.anchor.set(0.5);
        if (tint) this.bkg.tint = tint;
        this.addChild(this.bkg);
    }

    private buildNineSlice(): void {
        const { image, nineSliceConfig, tint = undefined } = this.buttonStateConfig;
        const { l, t, r, b, width, height } = nineSliceConfig as NineSliceConfig;

        this.bkg = new NineSlicePlane(Texture.from(image), l, t, r, b);
        this.bkg.width = width;
        this.bkg.height = height;
        this.bkg.position.set(-width / 2, -height / 2);
        if (tint) this.bkg.tint = tint;
        this.addChild(this.bkg);
    }

    private buildText({ text, style, x, y }: TextConfig): void {
        this.text = new Text(text, style);
        this.text.anchor.set(0.5);
        this.text.position.set(x || 0, y || 0);
        this.addChild(this.text);
    }
}
