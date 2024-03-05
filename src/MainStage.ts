import { Container } from 'pixi.js';
import { BackgroundView } from './views/BackgroundView';
import { ForegroundView } from './views/ForegroundView';
import { GameView } from './views/GameView';
import { LoaderView } from './views/LoaderView';
import { UIView } from './views/UIView';

class PixiStage extends Container {
    private backgroundView: BackgroundView;
    private gameView: GameView;
    private uiView: UIView;
    private foregroundView: ForegroundView;
    private loaderView: LoaderView | null;

    constructor() {
        super();

        this.loaderView = new LoaderView();
        this.addChild(this.loaderView);
    }

    public updateLoaderProgress(progress: number): void {
        this.loaderView?.updateProgress(progress);
    }

    public resize(): void {
        this.backgroundView?.rebuild();
        this.gameView?.rebuild();
        this.uiView?.rebuild();
        this.foregroundView?.rebuild();
        this.loaderView?.rebuild();
    }

    public start(): void {
        this.loaderView?.destroy();
        this.loaderView = null;

        this.backgroundView = new BackgroundView();
        this.addChild(this.backgroundView);
        this.gameView = new GameView();
        this.addChild(this.gameView);
        this.uiView = new UIView();
        this.addChild(this.uiView);
        this.foregroundView = new ForegroundView();
        this.addChild(this.foregroundView);
    }
}

export default PixiStage;
