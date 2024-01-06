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

export const getRedButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                image: 'spin_btn_up.png',
                textConfig,
            },
            down: {
                image: 'spin_btn_down.png',
                textConfig,
            },
            over: {
                image: 'spin_btn_up.png',
                textConfig,
            },
            disabled: {
                image: 'spin_btn_disable.png',
                textConfig,
            },
        },
    };
};
