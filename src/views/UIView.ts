import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { BottomBar } from './ui/BottomBar';
import { TopBar } from './ui/TopBar';

export class UIView extends PixiGrid {
    private bottomBar: BottomBar;
    private topBar: TopBar;

    public constructor() {
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
        this.buildBottomBar();
        this.buildTopBar();
    }

    private buildBottomBar(): void {
        this.bottomBar = new BottomBar();
        this.setChild('bottom_bar', this.bottomBar);
    }

    private buildTopBar(): void {
        this.topBar = new TopBar();
        this.setChild('top_bar', this.topBar);
    }
}
