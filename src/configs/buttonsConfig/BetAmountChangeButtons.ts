export const getPlusButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                image: 'plus_button_up.png',
            },
            down: {
                image: 'plus_button_down.png',
            },
            over: {
                image: 'plus_button_up.png',
            },
            disabled: {
                image: 'plus_button_disabled.png',
            },
        },
        downPosition: 5,
    };
};

export const getMinusButtonConfig = (): ButtonConfig => {
    return {
        states: {
            up: {
                image: 'minus_button_up.png',
            },
            down: {
                image: 'minus_button_down.png',
            },
            over: {
                image: 'minus_button_up.png',
            },
            disabled: {
                image: 'minus_button_disabled.png',
            },
        },
        downPosition: 5,
    };
};
