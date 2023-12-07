const ELEMENT_ID = Object.freeze({
    BR: 'br',
    FB: 'fb',
    IG: 'ig',
    PI: 'pi',
    SN: 'sn',
    TI: 'ti',
    TW: 'tw',
    YT: 'yt',
});

const ITEMS_WEIGHT = Object.freeze([
    {
        id: ELEMENT_ID.BR,
        weight: 5,
    },
    {
        id: ELEMENT_ID.FB,
        weight: 10,
    },
    {
        id: ELEMENT_ID.IG,
        weight: 15,
    },
    {
        id: ELEMENT_ID.PI,
        weight: 15,
    },
    {
        id: ELEMENT_ID.SN,
        weight: 10,
    },
    {
        id: ELEMENT_ID.TI,
        weight: 15,
    },
    {
        id: ELEMENT_ID.TW,
        weight: 15,
    },
    {
        id: ELEMENT_ID.YT,
        weight: 15,
    },
]);

const ITEMS_WIN_COEFFICIENT = Object.freeze({});

const LINES = [
    // STRAIGHT LINES
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3],
    [4, 4, 4, 4, 4],

    // DIAGONAL
    [0, 1, 2, 3, 4],
    [4, 3, 2, 1, 0],
];

export const getRatioData = () => {
    const totalCount = ITEMS_WEIGHT.reduce((acc, { weight }) => weight + acc, 0);
    const ratioData = getRatios(totalCount, ITEMS_WEIGHT);
    return ratioData;
};

const getRatios = (total: number, itemsConfig) => {
    let prev = 0;
    const data = itemsConfig.map(({ id, weight }) => {
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

export const getRandomElementsByCount = (count: number) => {
    const ratioData = getRatioData();
    const elements: any[] = [];

    for (let i = 0; i < count; i++) {
        const r = Math.random();
        const elementID = ratioData.find((el) => r > el.from && r < el.to).id;
        elements.push(elementID);
    }

    return elements;
};

export const getReelElements = () => {
    const reelCount = 5;
    const columns = 5;
    const reelData = {};
    for (let i = 0; i < reelCount; i++) {
        reelData[`reel_${i}`] = getRandomElementsByCount(columns);
    }

    return reelData;
};

const checkWinnings = (reelData) => {
    LINES.forEach((l) => {
        // fo
    });
};

export const getSpinResult = () => {
    // const reel1 =
    // const percentages = [5, 10, 10, 10, 10, 10, 10, 35];
};
