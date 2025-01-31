import { DEFAULT_FONT } from '../../Config';

const textConfig = {
    text: 'SPIN',
    style: {
        fontFamily: DEFAULT_FONT,
        fontSize: 36,
        fill: '#f8df6f',
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

export const getSpinButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                image: 'green_button_up.png',
                nineSliceConfig,
                textConfig,
            },
            down: {
                image: 'green_button_down.png',
                nineSliceConfig,
                textConfig,
            },
            over: {
                image: 'green_button_up.png',
                nineSliceConfig,
                textConfig,
            },
            disabled: {
                image: 'green_button_disabled.png',
                nineSliceConfig,
                textConfig,
            },
        },
        downPosition: 5,
    };
};
