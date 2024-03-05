import { lp } from '../../utils/Utils';

export const getUIGridConfig = () => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'bottom_bar',
                bounds: { x: 0, y: 0.85, width: 1, height: 0.15 },
            },
            {
                name: 'top_bar',
                bounds: { x: 0, y: 0, width: 1, height: 0.15 },
            },
            {
                name: 'player_info',
                bounds: { x: 0.5, y: 0.85, width: 0.5, height: 0.15 },
            },
        ],
    };
};

const getUIGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'top_bar',
                bounds: { x: 0, y: 0, width: 1, height: 0.15 },
            },
            {
                name: 'bottom_bar',
                bounds: { x: 0, y: 0.85, width: 1, height: 0.15 },
            },
            {
                name: 'player_info',
                bounds: { x: 0.5, y: 0.85, width: 0.5, height: 0.15 },
            },
        ],
    };
};
