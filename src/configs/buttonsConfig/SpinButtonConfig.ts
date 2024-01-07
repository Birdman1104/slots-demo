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

export const getSpinButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                image: 'spin_btn_up.png',
                textConfig,
            },
            down: {
                image: 'spin_btn_down.png',
                textConfig,
                tint: 0x00ff00,
            },
            over: {
                image: 'spin_btn_up.png',
                textConfig,
                tint: 0x0000ff,
            },
            disabled: {
                image: 'spin_btn_disable.png',
                textConfig,
                tint: 0xff0000,
            },
        },
    };
};
