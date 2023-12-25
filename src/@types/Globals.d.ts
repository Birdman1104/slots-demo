interface Window {
    game: any;
}

type TutorialSequenceConfig = {
    text: string;
    duration: number;
    clickToComplete: boolean;
};

type AssetNameAndPath = {
    name: string;
    path: string;
};

type SpineFiles = {
    key: string;
    jsonURL: string;
    atlasURL: string;
    preMultipliedAlpha?: boolean;
};

declare namespace GlobalMixins {
    interface DisplayObjectEvents {
        hideComplete: [string];
        showComplete: [string];
        click: [string];
    }
}

type EaseFunction = (k: number) => number;

type WinningInfo = {
    coefficient: number;
    count: number;
    id: string;
    winAmount: number;
    line: WinningLine;
};

type ReelsResult = ReelResult[];
type ReelResult = string[];
type WinningLine = number[];

type SpinResult = {
    reels: ReelsResult;
    winningInfo: WinningInfo[];
    totalWin: number;
};

type ElementWeightRatio = {
    id: string;
    from: number;
    to: number;
};

type WinningItemsCount = {
    count: number;
    elementType: string;
    line: number[];
};
