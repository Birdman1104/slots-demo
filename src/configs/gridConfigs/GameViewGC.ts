import { CellScale } from '@armathai/pixi-grid';
import { lp } from '../../Utils';

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'game',
        debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'game',
                scale: CellScale.fit,
                bounds: { x: 0, y: 0.15, width: 1, height: 0.7 },
            },
            {
                name: 'slot_machine',
                bounds: { x: 0.2, y: 0.14, width: 0.6, height: 0.64 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'game',
        debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'game',
                scale: CellScale.fit,
                bounds: { x: 0, y: 0.15, width: 1, height: 0.7 },
            },
            {
                name: 'slot_machine',
                bounds: { x: 0.05, y: 0.15, width: 0.9, height: 0.7 },
            },
        ],
    };
};
