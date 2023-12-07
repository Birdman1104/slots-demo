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

const ELEMENTS_CONFIG = Object.freeze([
    {
        id: ELEMENT_ID.BR,
        weight: 5,
        coefficient: [0, 0, 0.1, 0.4, 0.7],
    },
    {
        id: ELEMENT_ID.FB,
        weight: 10,
        coefficient: [0, 0, 0.2, 0.5, 0.8],
    },
    {
        id: ELEMENT_ID.IG,
        weight: 15,
        coefficient: [0, 0, 0.3, 0.6, 0.9],
    },
    {
        id: ELEMENT_ID.PI,
        weight: 15,
        coefficient: [0, 0, 0.4, 0.7, 1],
    },
    {
        id: ELEMENT_ID.SN,
        weight: 10,
        coefficient: [0, 0, 0.5, 0.8, 1.1],
    },
    {
        id: ELEMENT_ID.TI,
        weight: 150,
        coefficient: [0, 0, 0.6, 0.9, 1.2],
    },
    {
        id: ELEMENT_ID.TW,
        weight: 15,
        coefficient: [0, 0, 0.7, 1, 1.3],
    },
    {
        id: ELEMENT_ID.YT,
        weight: 15,
        coefficient: [0, 0, 0.8, 1.1, 1.4],
    },
]);

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

export const getRatioData = (itemsConfig) => {
    const totalCount = itemsConfig.reduce((acc, { weight }) => weight + acc, 0);
    const ratioData = getRatios(totalCount, itemsConfig);
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
    const ratioDataConfig = ELEMENTS_CONFIG.map((el) => {
        return { id: el.id, weight: el.weight };
    });
    const ratioData = getRatioData(ratioDataConfig);
    const elements: any[] = [];

    for (let i = 0; i < count; i++) {
        const r = Math.random();
        const elementID = ratioData.find((el) => r > el.from && r < el.to).id;
        elements.push(elementID);
    }

    return elements;
};

export const getReelElements = (bet) => {
    const reelCount = 5;
    const columns = 5;
    const reelData: any[] = [];
    for (let i = 0; i < reelCount; i++) {
        reelData.push(getRandomElementsByCount(columns));
    }
    const winningLines = checkWinnings(reelData);

    const winningInfo = winningLines.map(({ elementType: id, count }) => {
        const coefficient = ELEMENTS_CONFIG.find((el) => el.id === id)?.coefficient[count - 1] ?? 0;
        return {
            coefficient,
            id,
            count,
            winAmount: coefficient * bet,
        };
    });

    return {
        reelData,
        winningInfo,
    };
};

const checkWinnings = (reelData) => {
    const lines = LINES.map((line) => line.map((r, c) => reelData[c][r]));
    const linesInfo = lines.map((l) => winningItemsCount(l));
    return linesInfo.filter((l) => l.count >= 3);
};

const winningItemsCount = (elements: string[]): { count: number; elementType: string } => {
    let count = 1;
    const elementType = elements[0];
    for (let i = 1; i < elements.length; i++) {
        const e = elements[i];
        if (e === elementType) {
            count++;
        } else {
            break;
        }
    }
    return { count, elementType };
};

export const getSpinResult = () => {
    // const reel1 =
    // const percentages = [5, 10, 10, 10, 10, 10, 10, 35];
};
