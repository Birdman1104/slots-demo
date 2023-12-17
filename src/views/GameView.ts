import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { GameModelEvents, HeadModelEvents } from '../events/ModelEvents';
import { SlotMachineModel } from '../models/SlotMachineModel';
import { SlotMachineView } from './SlotMachineView';

export class GameView extends PixiGrid {
    private slotMachine: SlotMachineView;
    constructor() {
        super();
        this.build();
        lego.event.on(HeadModelEvents.GameModelUpdate, this.gameModelUpdate, this);
        lego.event.on(GameModelEvents.SlotMachineUpdate, this.onSlotMachineUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        //
    }

    private gameModelUpdate(a, b, c): void {
        // console.warn(a, b, c);
    }

    private onSlotMachineUpdate(slotMachine: SlotMachineModel | null): void {
        slotMachine ? this.buildSlotMachine(slotMachine) : this.destroySlotMachine();
    }

    private buildSlotMachine(slotMachine: SlotMachineModel): void {
        this.slotMachine = new SlotMachineView(slotMachine);
        this.setChild('slot_machine', this.slotMachine);
    }

    private destroySlotMachine(): void {
        this.slotMachine.destroy();
    }
}
