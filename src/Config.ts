export const CHANCE_TO_WIN = 80;
export const MIN_BET = 10;
export const MAX_BET = 10;

export const WIDTH = 128;
export const HEIGHT = 128;
export const OFFSET_Y = 30;
// export const SPEED = 1.3;
// export const SLOT_OFFSET = -8;

// export const SPIN_EASING = BackIn;
// export const STOP_EASING = BackOut;

export function getSlotMachineConfig() {
    return {
        reels: [
            {
                // offset: { x: 0, y: 4 },
                slots: [1, 0, 1, 2, 0, 4],
            },
            // {
            //     // offset: { x: 12, y: 4 },
            //     slots: [1, 0, 1, 2, 0, 4],
            // },
            // {
            //     // offset: { x: 12, y: 4 },
            //     slots: [1, 0, 1, 2, 0, 4],
            // },
            // {
            //     // offset: { x: 12, y: 4 },
            //     slots: [1, 0, 1, 2, 0, 4],
            // },
        ],
        // },
        // return lp(
        //     {
        //         clickable: true,
        //         bet: { step: 50, max: 900, min: 500 },
        //         prizeFactor: { regular: 10, big: 20, mega: 50 },
        //         combinations: {
        //             loose: [
        //                 [[0], [4], [1], [3]],
        //                 [[3], [1], [4], [0]],
        //             ],
        //             regular: [
        //                 [[0], [1], [1], [0]],
        //                 [[1], [2], [2], [1]],
        //             ],
        //             big: [
        //                 [[0], [0], [0], [0]],
        //                 [[1], [1], [1], [1]],
        //                 [[2], [2], [2], [2]],
        //             ],
        //             mega: [
        //                 [[0], [1], [2], [3]],
        //                 [[3], [2], [1], [0]],
        //             ],
        //         },
        //         reelsSpinDelay: 100,
        //         reelsStopDelay: 100,
        //         reels: [
        //             {
        //                 offset: { x: 0, y: 4 },
        //                 slots: [1, 0, 1, 2, 0, 4],
        //             },
        //             {
        //                 offset: { x: 12, y: 4 },
        //                 slots: [1, 0, 1, 2, 0, 4],
        //             },
        //             {
        //                 offset: { x: 12, y: 4 },
        //                 slots: [1, 0, 1, 2, 0, 4],
        //             },
        //             {
        //                 offset: { x: 12, y: 4 },
        //                 slots: [1, 0, 1, 2, 0, 4],
        //             },
        //         ],
        //     },
        //     {
        //         clickable: true,
        //         bet: { step: 50, max: 900, min: 500 },
        //         prizeFactor: { regular: 10, big: 20, mega: 50 },
        //         combinations: {
        //             loose: [
        //                 [[0], [4], [1], [3]],
        //                 [[3], [1], [4], [0]],
        //             ],
        //             regular: [
        //                 [[0], [1], [1], [0]],
        //                 [[1], [2], [2], [1]],
        //             ],
        //             big: [
        //                 [[0], [0], [0], [0]],
        //                 [[1], [1], [1], [1]],
        //                 [[2], [2], [2], [2]],
        //             ],
        //             mega: [
        //                 [[0], [1], [2], [3]],
        //                 [[3], [2], [1], [0]],
        //             ],
        //         },
        //         reelsSpinDelay: 100,
        //         reelsStopDelay: 100,
        //         reels: [
        //             {
        //                 offset: { x: 0, y: 4 },
        //                 slots: [1],
        //             },
        //             {
        //                 offset: { x: 12, y: 4 },
        //                 slots: [1],
        //             },
        //             {
        //                 offset: { x: 12, y: 4 },
        //                 slots: [1],
        //             },
        //             {
        //                 offset: { x: 12, y: 4 },
        //                 slots: [1],
        //             },
        //         ],
        //     },
        // );
    };
}
