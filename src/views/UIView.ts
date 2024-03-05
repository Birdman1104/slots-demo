import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { BalanceView } from './ui/BalanceView';
import { BetControllerView } from './ui/BetControllerView';
import { BottomBar } from './ui/BottomBar';

export class UIView extends PixiGrid {
    private controller: BetControllerView;
    private balance: BalanceView;
    private bottomBar: BottomBar;
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
        this.buildController();
        this.buildBalance();
    }

    private buildController(): void {
        this.bottomBar = new BottomBar();
        this.setChild('bottom_bar', this.bottomBar);
    }

    private buildBalance(): void {
        this.balance = new BalanceView();
        this.setChild('player_info', this.balance);
    }
}
