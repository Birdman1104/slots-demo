export const getPlusButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                image: 'bet_plus_btn_up.png',
            },
            down: {
                image: 'bet_plus_btn_down.png',
                tint: 0x00ff00,
            },
            over: {
                image: 'bet_plus_btn_up.png',
                tint: 0x0000ff,
            },
            disabled: {
                image: 'bet_plus_btn_disable.png',
                tint: 0xff0000,
            },
        },
    };
};

export const getMinusButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                image: 'bet_minus_btn_up.png',
            },
            down: {
                image: 'bet_minus_btn_down.png',
                tint: 0x00ff00,
            },
            over: {
                image: 'bet_minus_btn_up.png',
                tint: 0x0000ff,
            },
            disabled: {
                image: 'bet_minus_btn_disable.png',
                tint: 0xff0000,
            },
        },
    };
};
