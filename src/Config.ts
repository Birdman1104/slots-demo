import { getDefaultReelsConfig } from './slotLogic';

export const DEFAULT_FONT = 'SaranaiGame';

export const WIDTH = 264;
export const HEIGHT = 264;
export const OFFSET_Y = 0;
export const OFFSET_X = 8;

export function getSlotMachineConfig() {
    const { reels } = getDefaultReelsConfig();
    return { reels };
}

export const BETS = [10, 20, 30, 40, 50, 100, 150, 200, 300, 400, 500, 1000];
export const MIN_BET = 10;
export const MAX_BET = 1000;
