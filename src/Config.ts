import { getReelElements } from './slotLogic';

export const CHANCE_TO_WIN = 80;
export const MIN_BET = 10;
export const MAX_BET = 10;

export const WIDTH = 128;
export const HEIGHT = 128;
export const OFFSET_Y = 30;
export const OFFSET_X = 30;
// export const SPEED = 1.3;
// export const SLOT_OFFSET = -8;

// export const SPIN_EASING = BackIn;
// export const STOP_EASING = BackOut;

export function getSlotMachineConfig() {
    const config: { reels: any[] } = {
        reels: [],
    };

    const result = getReelElements(10);
    result.reelData.forEach((d) => {
        config.reels.push({ elements: d });
    });
    console.warn(result);

    return config;
}
