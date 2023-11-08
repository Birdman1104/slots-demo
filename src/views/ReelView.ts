import { lego } from '@armathai/lego';
import { Container } from 'pixi.js';
import { SLOT_OFFSET, SPEED, SPIN_EASING, STOP_EASING } from '../Config';
import { getTweenPoints, removeRunnable } from '../Utils';
import { ReelViewEvents } from '../events/MainEvents';
import { SlotModelEvents } from '../events/ModelEvents';
import { ReelModel } from '../models/ReelModel';
import { SlotModel } from '../models/SlotModel';
import { SlotView } from './SlotView';

export class ReelView extends Container {
    private _uuid: String;
    private offset = SLOT_OFFSET;
    private speed = SPEED;
    private loopRunnable: any; // TODO fix types
    private spinRunnable: any;
    private stopRunnable: any;
    private loopStep: number;
    private _slots: SlotView[];
    private _tileY = 0;
    private rHeight = 0;

    constructor(model: ReelModel) {
        super();
        const { slots, uuid } = model;
        this._uuid = uuid;

        this.build(slots);
        lego.event.on(SlotModelEvents.TypeUpdate, this.onSlotTypeUpdate, this);
    }

    get uuid() {
        return this.uuid;
    }

    get slots() {
        return this.slots;
    }

    get tileY() {
        return this.tileY;
    }

    set tileY(value) {
        this.tileY = value;
        this.updateSlotsPositions();
    }

    public getSlotByUUID(uuid: string): SlotView | undefined {
        return this._slots.find((slot) => slot.uuid === uuid);
    }

    public getSlotByIndex(index: number): SlotView {
        return this.slots[index];
    }

    public blur(): void {
        this._slots.forEach((s) => s.blur());
    }

    public unBlur(): void {
        this._slots.forEach((s) => s.unBlur());
    }

    public stop(): void {
        removeRunnable(this.loopRunnable);
        this.unBlur();
        const diff = this._height - (this._tileY % this._height);
        const points = getTweenPoints(this.speed, STOP_EASING, this._tileY, diff + this._height);
        this.stopRunnable = this.loopRunnable(0, () => {
            this.tileY = points.shift();
            if (!points.length) {
                removeRunnable(this.stopRunnable);
                lego.event.emit(ReelViewEvents.SlowDownComplete, this._uuid);
            }
        });
    }

    public spin(): void {
        const points = getTweenPoints(this.speed, SPIN_EASING, this._tileY, this._height);

        const lastPoints = points.slice(points.length - 2);
        this.loopStep = lastPoints[1] - lastPoints[0];
        this.spinRunnable = this.loopRunnable(0, () => {
            this.tileY = points.shift();

            if (!points.length) {
                removeRunnable(this.spinRunnable);
                this.loop();
                lego.event.emit(ReelViewEvents.SpeedUpComplete, this._uuid);
            }
        });
    }

    public destroy(): void {
        removeRunnable(this.spinRunnable);
        removeRunnable(this.stopRunnable);
        removeRunnable(this.loopRunnable);

        super.destroy();
    }

    private onSlotTypeUpdate(newType: number, oldType: number, uuid: string): void {
        const slotView = this.getSlotByUUID(uuid);
        if (!slotView) {
            return;
        }

        slotView.once('onSlotLoop', () => {
            slotView.setType(newType);
            this._height = this.calculateHeight();
        });
    }

    private build(slots: SlotModel[]): void {
        this.buildSlots(slots);
        this.rHeight = this.calculateHeight();
    }

    private buildSlots(slots: SlotModel[]): void {
        this._slots = slots.map((config) => {
            const slot = new SlotView(config);
            slot.on('onSlotLoop', this.onSlotLoop, this);
            this.addChild(slot);
            return slot;
        });
    }

    private onSlotLoop(uuid: string): void {
        this.slots[0].uuid === uuid && this.emit('onReelLoop', this.uuid);
    }

    private calculateHeight(): number {
        return this._slots.reduce((acc, cur) => acc + cur.height + this.offset, 0);
    }

    private loop(): void {
        this.loopRunnable = this.loopRunnable(0, () => (this.tileY += this.loopStep));
    }

    private updateSlotsPositions(): void {
        for (let i = 0; i < this._slots.length; i += 1) {
            const slot = this._slots[i];

            if (i === 0) {
                slot.setY((this._tileY % this.rHeight) + this.offset);
            } else {
                const previews = this._slots[i - 1];
                slot.setY(previews.bottom + this.offset);
            }

            this.checkForLimits(slot);
        }
    }

    private checkForLimits(slot: SlotView): void {
        if (slot.bottom > this.rHeight) {
            slot.loopHandler();
            slot.setY(slot.top - this.rHeight);
        } else if (slot.bottom < 0) {
            slot.loopHandler();
            slot.setY(slot.top + this.rHeight);
        }
    }
}
