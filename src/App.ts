import { lego } from '@armathai/lego';
import { PixiStatsPlugin } from '@armathai/pixi-stats';
import { Application, Assets } from 'pixi.js';
import PixiStage from './MainStage';
import SoundController from './SoundController';
import { assets } from './assets/assetsNames/assets';
import { atlases } from './assets/assetsNames/atlas';
import { fonts } from './assets/assetsNames/fonts';
import { fitDimension } from './utils/Utils';
// import { spines } from './assets/assetsNames/spines';
import { mapCommands } from './configs/EventCommandPairs';
import { ScreenSizeConfig } from './configs/ScreenSizeConfig';
import { MainGameEvents, WindowEvent } from './events/MainEvents';

class App extends Application {
    public stage: PixiStage;

    public constructor() {
        super({
            backgroundColor: 0x000000,
            backgroundAlpha: 1,
            powerPreference: 'high-performance',
            antialias: true,
            resolution: Math.max(window.devicePixelRatio || 1, 2),
            sharedTicker: true,
            width: 1920,
            height: 1080,
        });
    }

    public async init(): Promise<void> {
        Assets.add('logo', 'assets/logo/logo.png');
        await Assets.load('logo');

        this.stage = new PixiStage();
        // @ts-ignore
        this.view.classList.add('app');
        // @ts-ignore
        document.body.appendChild(this.view);
        this.appResize();
        if (process.env.NODE_ENV !== 'production') {
            this.initStats();
            this.initLego();
        }
        await this.loadAssets();
        this.onLoadComplete();
    }

    public appResize(): void {
        const { clientWidth: w, clientHeight: h } = document.body;
        if (w === 0 || h === 0) return;

        const { min, max } = ScreenSizeConfig.size.ratio;
        const { width, height } = fitDimension({ width: w, height: h }, min, max);

        this.resizeCanvas(width, height);
        this.resizeRenderer(width, height);

        this.stage.resize();

        lego.event.emit(MainGameEvents.Resize);
    }

    public onFocusChange(focus: boolean): void {
        lego.event.emit(WindowEvent.FocusChange, focus);
    }

    private async loadAssets(): Promise<void> {
        // TODO update loader loading
        const arr: string[] = [];

        for (const asset of assets) {
            const { name, path } = asset;
            Assets.add(name, path);
            arr.push(name);
            // await Assets.load(name);
        }
        for (const atlas of atlases) {
            const { name, json } = atlas;
            Assets.add(name, json);
            arr.push(name);

            // await Assets.load(name);
        }
        for (const font of fonts) {
            const { name, path } = font;
            Assets.add(name, path);
            arr.push(name);

            // await Assets.load(name);
        }

        SoundController.loadSounds();
        await Assets.load(arr, (progress: number) => {
            this.stage.updateLoaderProgress(progress);
        });
    }

    private onLoadComplete(): void {
        this.appResize();
        this.stage.start();
        lego.command.execute(mapCommands);
        lego.event.emit(MainGameEvents.MainViewReady);
    }

    private resizeCanvas(width: number, height: number): void {
        const { style } = this.renderer.view;
        if (!style) return;
        style.width = `${width}px`;
        style.height = `${height}px`;
    }

    private resizeRenderer(width: number, height: number): void {
        this.renderer.resize(width, height);
    }

    private initLego(): void {
        // legoLogger.start(lego, Object.freeze({}));
        // TODO GAMEINITCOMMAND
        // lego.command.execute(onGameInitCommand);
        // lego.event.emit(MainGameEvents.Init);
    }

    private initStats(): void {
        //@ts-ignore
        const stats = new PixiStatsPlugin(this);
        document.body.appendChild(stats.stats.dom);
        this.ticker.add(() => stats.stats.update());
    }
}

export default App;
