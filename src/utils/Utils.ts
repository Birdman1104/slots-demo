import { NineSlicePlane, Texture } from 'pixi.js';

export const lp = (l, p) => {
    const { clientWidth: w, clientHeight: h } = document.body;
    return w > h ? l : p;
};

export const BackOut = (k: number): number => {
    // const s = 1.70158; | default
    const s = 0.7;
    return --k * k * ((s + 1) * k + s) + 1;
};

export const BackIn = (k: number): number => {
    // const s = 1.70158; | default
    const s = 0.7;
    return k * k * ((s + 1) * k - s);
};

export const last = (arr: any[]): any => {
    return arr.slice(-1)[0];
};

export const sample = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const randomInt = (min, max) => {
    const mi = Math.ceil(min);
    const ma = Math.floor(max);
    return Math.floor(Math.random() * (ma - mi + 1)) + mi;
};

export const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = randomInt(0, i);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
};

export const getTweenPoints = (time: number, ease: EaseFunction, from: number, to: number): number[] => {
    const dt = 60; // TODO check fps
    const points: number[] = [];
    const framesCount = Math.round(((1 / time) * 1000) / dt);
    for (let i = 1; i <= framesCount; i += 1) {
        points.push(Math.round(from + ease(i / framesCount) * to));
    }

    return points;
};

export const fitDimension = (
    dim: { width: number; height: number },
    minRatio: number,
    maxRatio: number,
): { width: number; height: number } => {
    const ratioW = dim.width / dim.height;
    const ratioH = dim.height / dim.width;

    if (ratioW < ratioH) {
        if (ratioW > maxRatio) {
            dim.width = dim.width * (maxRatio / ratioW);
        } else if (ratioW < minRatio) {
            dim.height = dim.height * (ratioW / minRatio);
        }
    } else {
        if (ratioH > maxRatio) {
            dim.height = dim.height * (maxRatio / ratioH);
        } else if (ratioH < minRatio) {
            dim.width = dim.width * (ratioH / minRatio);
        }
    }

    return dim;
};

export const delayRunnable = (delay, runnable, context?, ...args) => {
    let delayMS = delay * 1000;
    const delayWrapper = () => {
        delayMS -= window.game.ticker.deltaMS;
        if (delayMS <= 0) {
            runnable.call(context, ...args);
            window.game.ticker.remove(delayWrapper);
        }
    };
    window.game.ticker.add(delayWrapper);
    return delayWrapper;
};

// TODO check if runnables work correctly
export const removeRunnable = (runnable) => window.game.ticker.remove(runnable);

export const extendConfig = (config: any): any => {
    const { offset } = config;
    config.offset = { x: offset.x || 0, y: offset.y || 0 };

    return config;
};

export const getNineSlice = (image: string, nineSliceConfig: NineSliceConfig, tint?: number): NineSlicePlane => {
    const { l, t, r, b, width, height } = nineSliceConfig as NineSliceConfig;

    const nineSlice = new NineSlicePlane(Texture.from(image), l, t, r, b);
    nineSlice.width = width;
    nineSlice.height = height;
    nineSlice.position.set(-width / 2, -height / 2);
    if (tint) nineSlice.tint = tint;
    return nineSlice;
};
