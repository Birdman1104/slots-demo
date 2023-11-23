import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Sprite } from 'pixi.js';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { UIEvents } from '../events/MainEvents';

export class UIView extends PixiGrid {
    constructor() {
        super();
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        const button = Sprite.from('bkg.png');
        button.eventMode = 'static';
        button.on('pointerdown', () => lego.event.emit(UIEvents.SpinButtonClick));
        this.setChild('button', button);
    }
}
