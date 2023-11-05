import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { GameModelEvents, HeadModelEvents } from '../events/ModelEvents';
import { SlotContainer } from './SlotContainer';

export class GameView extends PixiGrid {
    constructor() {
        super();
        this.build();
        lego.event.on(HeadModelEvents.GameModelUpdate, this.gameModelUpdate, this);
        lego.event.on(GameModelEvents.SlotMachineUpdate, this.onSlotUpd, this);
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        const slotContainer = new SlotContainer();
        this.setChild(`game`, slotContainer);
    }

    private gameModelUpdate(a, b, c): void {
        console.warn(a, b, c);
    }

    private onSlotUpd(a, b, c): void {
        console.warn(a, b, c);
    }
}
