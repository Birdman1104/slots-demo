const REELS_AMOUNT = 5;
const ROWS_AMOUNT = 3;

const ELEMENT_ID = Object.freeze({
    BANANA: 'banana',
    CHERRY: 'cherry',
    GRAPES: 'grapes',
    LEMON: 'lemon',
    ORANGE: 'orange',
    PLUM: 'plum',
    WATERMELON: 'watermelon',
});

const ELEMENTS_CONFIG = Object.freeze([
    {
        id: ELEMENT_ID.BANANA,
        weight: 5,
        coefficient: [0, 0, 0.1, 0.4, 0.7],
    },
    {
        id: ELEMENT_ID.CHERRY,
        weight: 10,
        coefficient: [0, 0, 0.2, 0.5, 0.8],
    },
    {
        id: ELEMENT_ID.GRAPES,
        weight: 15,
        coefficient: [0, 0, 0.3, 0.6, 0.9],
    },
    {
        id: ELEMENT_ID.LEMON,
        weight: 15,
        coefficient: [0, 0, 0.4, 0.7, 1],
    },
    {
        id: ELEMENT_ID.ORANGE,
        weight: 10,
        coefficient: [0, 0, 0.5, 0.8, 1.1],
    },
    {
        id: ELEMENT_ID.PLUM,
        weight: 200,
        coefficient: [0, 0, 0.6, 0.9, 1.2],
    },
    {
        id: ELEMENT_ID.WATERMELON,
        weight: 15,
        coefficient: [0, 0, 0.7, 1, 1.3],
    },
]);

const LINES = [
    // STRAIGHT LINES
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],

    // DIAGONAL
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
];

const getRatioData = (itemsConfig): ElementWeightRatio[] => {
    const totalCount = itemsConfig.reduce((acc, { weight }) => weight + acc, 0);
    const ratioData: ElementWeightRatio[] = getRatios(totalCount, itemsConfig);
    return ratioData;
};

const getRatios = (total: number, itemsConfig): ElementWeightRatio[] => {
    let prev = 0;
    const data: ElementWeightRatio[] = itemsConfig.map(({ id, weight }) => {
        const obj = {
            id,
            from: prev,
            to: prev + weight / total,
        };
        prev = prev + weight / total;
        return obj;
    });
    return data;
};

const getReelResult = (count: number): ReelResult => {
    const ratioDataConfig = ELEMENTS_CONFIG.map((el) => {
        return { id: el.id, weight: el.weight };
    });
    const ratioData = getRatioData(ratioDataConfig);
    const elements: ReelResult = [];

    for (let i = 0; i < count; i++) {
        const r = Math.random();
        const elementID = (ratioData.find((el) => r > el.from && r < el.to) as ElementWeightRatio).id;
        elements.push(elementID);
    }

    return elements;
};

const getReelsData = (): ReelsResult => {
    const reels: ReelsResult = [];
    for (let i = 0; i < REELS_AMOUNT; i++) {
        reels.push(getReelResult(ROWS_AMOUNT));
    }
    return reels;
};

const checkWinnings = (reelData: ReelsResult): WinningItemsCount[] => {
    const lines = LINES.map((line) => {
        return {
            elements: line.map((r, c) => reelData[c][r]),
            line,
        };
    });
    const linesInfo = lines.map((l) => winningItemsCount(l));
    return linesInfo.filter((l) => l.count >= 3);
};

const winningItemsCount = (data: { elements: string[]; line: number[] }): WinningItemsCount => {
    let count = 1;
    const elementType = data.elements[0];
    for (let i = 1; i < data.elements.length; i++) {
        const e = data.elements[i];
        if (e === elementType) {
            count++;
        } else {
            break;
        }
    }
    return { count, elementType, line: data.line };
};

export const spin = async (bet: number): Promise<SpinResult> => {
    const reels = getReelsData();
    const winningLines = checkWinnings(reels);

    const winningInfo: WinningInfo[] = winningLines.map(({ elementType: id, count, line }) => {
        const coefficient = ELEMENTS_CONFIG.find((el) => el.id === id)?.coefficient[count - 1] ?? 0;
        return {
            coefficient,
            id,
            count,
            winAmount: coefficient * bet,
            line,
        };
    });
    const totalWin = winningInfo.reduce((acc, curr) => acc + curr.winAmount, 0);

    return new Promise((resolve) =>
        setTimeout(() => {
            resolve({
                reels,
                winningInfo,
                totalWin,
            });
        }, 100),
    );
};

export const getDefaultReelsConfig = (): SpinResult => {
    return {
        reels: [
            [ELEMENT_ID.BANANA, ELEMENT_ID.BANANA, ELEMENT_ID.BANANA],
            [ELEMENT_ID.CHERRY, ELEMENT_ID.CHERRY, ELEMENT_ID.CHERRY],
            [ELEMENT_ID.GRAPES, ELEMENT_ID.GRAPES, ELEMENT_ID.GRAPES],
            [ELEMENT_ID.LEMON, ELEMENT_ID.LEMON, ELEMENT_ID.LEMON],
            [ELEMENT_ID.ORANGE, ELEMENT_ID.ORANGE, ELEMENT_ID.ORANGE],
        ],
        winningInfo: [],
        totalWin: 0,
    };
};

export const getDefaultPlayerInfo = async (): Promise<any> => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve({
                balance: 10000,
                bet: 10,
                id: Math.random() * 1000,
            });
        }, 100),
    );
};
