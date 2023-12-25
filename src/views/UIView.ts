import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { BalanceView } from './BalanceView';
import { BetControllerView } from './BetControllerView';

export class UIView extends PixiGrid {
    private controller: BetControllerView;
    private balance: BalanceView;
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
        this.controller = new BetControllerView();
        this.setChild('controller', this.controller);
    }

    private buildBalance(): void {
        this.balance = new BalanceView();
        this.setChild('player_info', this.balance);
    }
}
