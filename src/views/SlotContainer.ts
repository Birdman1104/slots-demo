import { BlurFilter, Container, Rectangle, Sprite } from 'pixi.js';

export const ITEMS_CONFIG = [
    {
        img: `item_0`,
        name: `facebook`,
    },
    {
        img: `item_1`,
        name: `instagram`,
    },
    {
        img: `item_2`,
        name: `twitter`,
    },
    {
        img: `item_3`,
        name: `pinterest`,
    },
    {
        img: `item_4`,
        name: `tinder`,
    },
    {
        img: `item_5`,
        name: `snapchat`,
    },
    {
        img: `item_6`,
        name: `youtube`,
    },
];

const WIDTH = 256;
const HEIGHT = 256;
const COLS = 5;
const ROWS = 4;

export class SlotContainer extends Container {
    constructor() {
        super();

        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, WIDTH * COLS, HEIGHT * ROWS);
    }

    private build(): void {
        const reels = [];

        for (let i = 0; i < COLS; i++) {
            const rc = new Container();
            rc.x = i * WIDTH;
            this.addChild(rc);

            const reel = {
                container: rc,
                symbols: [],
                position: 0,
                previousPosition: 0,
                blur: new BlurFilter(),
            };

            reel.blur.blurX = 0;
            reel.blur.blurY = 0;
            rc.filters = [reel.blur];

            for (let j = 0; j < ROWS; j++) {
                const symbol = Sprite.from(`item_${Math.floor(Math.random() * ITEMS_CONFIG.length)}.png`);
                symbol.y = j * HEIGHT;
                symbol.x = Math.round((WIDTH - symbol.width) / 2);
                // @ts-ignore
                reel.symbols.push(symbol);
                rc.addChild(symbol);
            }
            // @ts-ignore
            reels.push(reel);
        }
    }
}
