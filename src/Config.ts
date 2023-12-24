import { getDefaultReelsConfig } from './slotLogic';

export const WIDTH = 128;
export const HEIGHT = 128;
export const OFFSET_Y = 30;
export const OFFSET_X = 30;
// export const SPEED = 1.3;
// export const SLOT_OFFSET = -8;

// export const SPIN_EASING = BackIn;
// export const STOP_EASING = BackOut;

export function getSlotMachineConfig() {
    const { reels } = getDefaultReelsConfig();
    return { reels };
}

export const BETS = [10, 20, 30, 40, 50, 100, 150, 200, 300, 400, 500, 1000];
export const MIN_BET = 10;
export const MAX_BET = 1000;
