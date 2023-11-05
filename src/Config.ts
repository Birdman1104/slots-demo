import { BackIn, BackOut, lp } from './Utils';

export const CHANCE_TO_WIN = 80;

export function getSlotMachineConfig() {
    return lp(
        {
            slotOffset: -8,
            clickable: true,
            speed: 1.3,
            bet: { step: 50, max: 900, min: 500 },
            prizeFactor: { regular: 10, big: 20, mega: 50 },
            combinations: {
                loose: [
                    [[0], [4], [1], [3]],
                    [[3], [1], [4], [0]],
                ],
                regular: [
                    [[0], [1], [1], [0]],
                    [[1], [2], [2], [1]],
                ],
                big: [
                    [[0], [0], [0], [0]],
                    [[1], [1], [1], [1]],
                    [[2], [2], [2], [2]],
                ],
                mega: [
                    [[0], [1], [2], [3]],
                    [[3], [2], [1], [0]],
                ],
            },
            mask: [
                { x: 20, y: 20 },
                { x: 570, y: 20 },
                { x: 570, y: 540 },
                { x: 20, y: 540 },
            ],
            spinEasing: BackIn,
            stopEasing: BackOut,
            reelsSpinDelay: 100,
            reelsStopDelay: 100,
            reels: [
                {
                    offset: { x: 0, y: 4 },
                    slots: [1, 0, 1, 2, 0, 4],
                },
                {
                    offset: { x: 12, y: 4 },
                    slots: [1, 0, 1, 2, 0, 4],
                },
                {
                    offset: { x: 12, y: 4 },
                    slots: [1, 0, 1, 2, 0, 4],
                },
                {
                    offset: { x: 12, y: 4 },
                    slots: [1, 0, 1, 2, 0, 4],
                },
            ],
            slotDimensions: [
                { width: 123, height: 138 },
                { width: 123, height: 138 },
                { width: 123, height: 138 },
                { width: 123, height: 270 },
                { width: 123, height: 138 },
            ],
        },
        {
            slotOffset: -8,
            clickable: true,
            speed: 1.3,
            bet: { step: 50, max: 900, min: 500 },
            prizeFactor: { regular: 10, big: 20, mega: 50 },
            combinations: {
                loose: [
                    [[0], [4], [1], [3]],
                    [[3], [1], [4], [0]],
                ],
                regular: [
                    [[0], [1], [1], [0]],
                    [[1], [2], [2], [1]],
                ],
                big: [
                    [[0], [0], [0], [0]],
                    [[1], [1], [1], [1]],
                    [[2], [2], [2], [2]],
                ],
                mega: [
                    [[0], [1], [2], [3]],
                    [[3], [2], [1], [0]],
                ],
            },
            mask: [
                { x: 20, y: 20 },
                { x: 570, y: 20 },
                { x: 570, y: 540 },
                { x: 20, y: 540 },
            ],
            spinEasing: BackIn,
            stopEasing: BackOut,
            reelsSpinDelay: 100,
            reelsStopDelay: 100,
            reels: [
                {
                    offset: { x: 0, y: 4 },
                    slots: [1, 0, 1, 2, 0, 4],
                },
                {
                    offset: { x: 12, y: 4 },
                    slots: [1, 0, 1, 2, 0, 4],
                },
                {
                    offset: { x: 12, y: 4 },
                    slots: [1, 0, 1, 2, 0, 4],
                },
                {
                    offset: { x: 12, y: 4 },
                    slots: [1, 0, 1, 2, 0, 4],
                },
            ],
            slotDimensions: [
                { width: 123, height: 138 },
                { width: 123, height: 138 },
                { width: 123, height: 138 },
                { width: 123, height: 270 },
                { width: 123, height: 138 },
            ],
        },
    );
}
