import { AnimatedSprite, Assets, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { HEIGHT, WIDTH } from '../Config';
import { ElementModel } from '../models/ElementModel';

export class ElementView extends Container {
    private _uuid: string;
    private _type: string;
    private element: Sprite;
    private animatedSprite: AnimatedSprite;

    constructor(config: ElementModel) {
        super();

        this._uuid = config.uuid;
        this._type = config.type;

        this.updateDimensions();
        this.buildElement();
        this.buildAnimatedSprite();
    }

    get uuid() {
        return this._uuid;
    }

    get type() {
        return this._type;
    }

    get bottom() {
        return this.y + this.height / 2;
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, WIDTH, HEIGHT);
    }

    public startAnimation(isWinningItem: boolean): void {
        isWinningItem ? this.clearDim() : this.dim();
        this.animatedSprite.visible = true;
        this.animatedSprite.play();

        this.element.visible = false;
    }

    public dim() {
        this.animatedSprite.tint = 0xa0a0a0;
        this.element.tint = 0xa0a0a0;
    }

    public clearDim() {
        this.animatedSprite.tint = 0xffffff;
        this.element.tint = 0xffffff;
    }

    public endAnimation(): void {
        this.element.visible = true;
        this.animatedSprite.visible = false;
        this.animatedSprite.stop();
    }

    private buildElement(): void {
        this.element && this.element.destroy();

        this.element = Sprite.from(`${this._type}.png`);
        this.element.anchor.set(0.5);
        this.addChild(this.element);
    }

    private buildAnimatedSprite() {
        const spriteSheet = Assets.cache.get(`${this.type}_animation`);

        const textures: Texture[] = [];

        for (const keys in spriteSheet.textures) {
            textures.push(spriteSheet.textures[keys]);
        }
        sortTextures(textures);

        this.animatedSprite = new AnimatedSprite(textures);
        this.animatedSprite.position.set(-this.element.width / 2, -this.element.height / 2);
        this.addChild(this.animatedSprite);
        this.animatedSprite.animationSpeed = 1 / 2; // 30 FPS

        this.animatedSprite.visible = false;
    }

    private updateDimensions(): void {
        // TODO Fix this config
        this.width = WIDTH;
        this.height = HEIGHT;
    }
}

function sortTextures(textures: Texture[]): void {
    const extractNumberFromTextureName = (name): number =>
        +name.slice(name.lastIndexOf('_') + 1, name.lastIndexOf('.'));

    textures.sort((textureA: Texture, textureB: Texture) => {
        const a = extractNumberFromTextureName(textureA.textureCacheIds[0]);
        const b = extractNumberFromTextureName(textureB.textureCacheIds[0]);
        return a - b;
    });
}
