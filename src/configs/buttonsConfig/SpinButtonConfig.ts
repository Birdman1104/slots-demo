const textConfig = {
    text: 'SPIN',
    style: {
        fontFamily: 'Arial',
        fontSize: 32,
        fill: '#8811aa',
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
    };
};
