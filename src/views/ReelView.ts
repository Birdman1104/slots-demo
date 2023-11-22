import { lego } from '@armathai/lego';
import { Container, Graphics, Rectangle } from 'pixi.js';
// import { SLOT_OFFSET, SPEED, SPIN_EASING, STOP_EASING } from '../Config';
import { OFFSET_Y, WIDTH } from '../Config';
import { last } from '../Utils';
import { SlotModelEvents } from '../events/ModelEvents';
import { ReelModel } from '../models/ReelModel';
import { SlotModel } from '../models/SlotModel';
import { SlotView } from './SlotView';

export class ReelView extends Container {
    private _uuid: String;
    // private offset = SLOT_OFFSET;
    // private speed = SPEED;
    // private loopRunnable: any; // TODO fix types
    // private spinRunnable: any;
    // private stopRunnable: any;
    // private loopStep: number;
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
        return this._uuid;
    }

    get slots() {
        return this._slots;
    }

    get tileY() {
        return this._tileY;
    }

    set tileY(value) {
        this._tileY = value;
        this.updateSlotsPositions();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, WIDTH, this.calculateHeight());
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
        // removeRunnable(this.loopRunnable);
        // this.unBlur();
        // const diff = this._height - (this._tileY % this._height);
        // const points = getTweenPoints(this.speed, STOP_EASING, this._tileY, diff + this._height);
        // this.stopRunnable = this.loopRunnable(0, () => {
        //     this._tileY = points.shift() as number;
        //     if (!points.length) {
        //         removeRunnable(this.stopRunnable);
        //         lego.event.emit(ReelViewEvents.SlowDownComplete, this._uuid);
        //     }
        // });
    }

    public spin(): void {
        // const points = getTweenPoints(this.speed, SPIN_EASING, this._tileY, this._height);
        // const lastPoints = points.slice(points.length - 2);
        // this.loopStep = lastPoints[1] - lastPoints[0];
        // this.spinRunnable = this.loopRunnable(0, () => {
        //     this.tileY = points.shift() as number;
        //     if (!points.length) {
        //         removeRunnable(this.spinRunnable);
        //         this.loop();
        //         lego.event.emit(ReelViewEvents.SpeedUpComplete, this._uuid);
        //     }
        // });
    }

    public destroy(): void {
        // removeRunnable(this.spinRunnable);
        // removeRunnable(this.stopRunnable);
        // removeRunnable(this.loopRunnable);

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
        this.updateSlotsPositions();

        const gr = new Graphics();
        gr.beginFill(0xff0000, 0.5);
        gr.drawRect(0, 0, this.width, this.height);
        gr.endFill();
        this.addChild(gr);
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
        console.warn(last(this.slots).bottom);
        // console.warn(this.height);

        return this._slots.reduce((acc, cur) => acc + cur.height + OFFSET_Y, 0) - OFFSET_Y;
        // return this._slots.reduce((acc, cur) => acc + cur.height + this.offset, 0);
    }

    private loop(): void {
        // this.loopRunnable = this.loopRunnable(0, () => (this.tileY += this.loopStep));
    }

    private updateSlotsPositions(): void {
        for (let i = 0; i < this._slots.length; i += 1) {
            const slot = this._slots[i];

            if (i === 0) {
                slot.y = slot.height / 2;
                slot.x = slot.width / 2;
                // slot.setY();
                // slot.setY((this._tileY % this.rHeight) + this.offset);
            } else {
                const previews = this._slots[i - 1];
                slot.y = previews.bottom + slot.height / 2 + OFFSET_Y;
                slot.x = slot.width / 2;
            }

            // this.checkForLimits(slot);
        }
    }

    private checkForLimits(slot: SlotView): void {
        console.warn(`check for limits`);

        if (slot.bottom > this.rHeight) {
            slot.loopHandler();
            slot.y = slot.top - this.rHeight + slot.height;
            // slot.setY(slot.top - this.rHeight);
        } else if (slot.bottom < 0) {
            slot.loopHandler();
            slot.y = slot.top + this.rHeight + slot.height;
            // slot.setY(slot.top + this.rHeight);
        }
    }
}
