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

type ButtonConfig = {
    states: ButtonStates;
    hitArea?: ButtonHitAreaConfig;
    downPosition?: number;
};

type ButtonStates = {
    up: ButtonStateConfig;
    down?: ButtonStateConfig;
    over?: ButtonStateConfig;
    disabled?: ButtonStateConfig;
};

type ButtonStateConfig = {
    image: string;
    nineSliceConfig?: NineSliceConfig;
    tint?: number;
    textConfig?: TextConfig;
};

type ButtonHitAreaConfig = {
    area: any;
    callback: any;
};

type TextConfig = {
    text: string;
    style: TextStyle;
    x: number;
    y: number;
};

type NineSliceConfig = {
    l: number;
    r: number;
    t: number;
    b: number;
    width: number;
    height: number;
};
