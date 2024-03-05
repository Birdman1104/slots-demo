import { DEFAULT_FONT } from '../../Config';

const textConfig = {
    text: 'MAX\nBET',
    style: {
        fontFamily: DEFAULT_FONT,
        fontSize: 36,
        fill: '#454545',
        align: 'center',
    },
    x: 0,
    y: 0,
};

const nineSliceConfig: NineSliceConfig = {
    l: 33,
    r: 33,
    t: 42,
    b: 43,
    width: 192,
    height: 128,
};

export const getMaxBetButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                image: 'base_button_up.png',
                nineSliceConfig,
                textConfig,
            },
            down: {
                image: 'base_button_down.png',
                nineSliceConfig,
                textConfig,
            },
            over: {
                image: 'base_button_up.png',
                nineSliceConfig,
                textConfig,
            },
            disabled: {
                image: 'base_button_disabled.png',
                nineSliceConfig,
                textConfig,
            },
        },
        downPosition: 5,
    };
};
