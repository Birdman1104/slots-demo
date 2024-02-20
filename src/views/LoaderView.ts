import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Container, Graphics, Sprite } from 'pixi.js';
import { getBackgroundGridConfig } from '../configs/gridConfigs/BackgroundViewGC';

const PROGRESS_BAR_CONFIG = {
    backgroundColor: '#b31f03',
    border: 4,
    borderColor: '#FFFFFF',
    fillColor: '#4cd137',
    height: 30,
    radius: 25,
    width: 550,
};
export class LoaderView extends PixiGrid {
    private wrapper: Container;
    private progress = 0;
    private fillerMask: Graphics;

    constructor() {
        super();
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getBackgroundGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    public updateProgress(progress: number) {
        this.progress = progress;
        this.fillerMask.width = this.progress * PROGRESS_BAR_CONFIG.width;
    }

    private build(): void {
        this.wrapper = new Container();

        const background = new Graphics()
            .beginFill(PROGRESS_BAR_CONFIG.borderColor)
            .drawRoundedRect(0, 0, PROGRESS_BAR_CONFIG.width, PROGRESS_BAR_CONFIG.height, PROGRESS_BAR_CONFIG.radius)
            .beginFill(PROGRESS_BAR_CONFIG.backgroundColor)
            .drawRoundedRect(
                PROGRESS_BAR_CONFIG.border,
                PROGRESS_BAR_CONFIG.border,
                PROGRESS_BAR_CONFIG.width - PROGRESS_BAR_CONFIG.border * 2,
                PROGRESS_BAR_CONFIG.height - PROGRESS_BAR_CONFIG.border * 2,
                PROGRESS_BAR_CONFIG.radius,
            );

        const filler = new Graphics()
            .beginFill(PROGRESS_BAR_CONFIG.borderColor)
            .drawRoundedRect(0, 0, PROGRESS_BAR_CONFIG.width, PROGRESS_BAR_CONFIG.height, PROGRESS_BAR_CONFIG.radius)
            .beginFill(PROGRESS_BAR_CONFIG.fillColor)
            .drawRoundedRect(
                PROGRESS_BAR_CONFIG.border,
                PROGRESS_BAR_CONFIG.border,
                PROGRESS_BAR_CONFIG.width - PROGRESS_BAR_CONFIG.border * 2,
                PROGRESS_BAR_CONFIG.height - PROGRESS_BAR_CONFIG.border * 2,
                PROGRESS_BAR_CONFIG.radius,
            );

        this.fillerMask = new Graphics();
        this.fillerMask.beginFill(0xff0000, 0.5);
        this.fillerMask.drawRect(filler.x, filler.y, filler.width, filler.height);
        this.fillerMask.endFill();

        filler.mask = this.fillerMask;

        this.wrapper.addChild(background, filler, this.fillerMask);

        const logo = Sprite.from('logo');
        logo.anchor.set(0.5);
        logo.position.set(PROGRESS_BAR_CONFIG.width / 2, -logo.height / 2 - 50);
        this.wrapper.addChild(logo);

        this.setChild('background', this.wrapper);

        this.updateProgress(0);
    }
}
