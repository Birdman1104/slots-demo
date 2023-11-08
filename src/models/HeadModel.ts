import { GameModel } from './GameModel';
import { ObservableModel } from './ObservableModel';
import { PlayerModel } from './PlayerModel';

class HeadModel extends ObservableModel {
    private _gameModel: GameModel | null = null;
    private _playerModel: PlayerModel | null = null;

    constructor() {
        super('HeadModel');
        this.makeObservable();
    }

    set gameModel(value) {
        this._gameModel = value;
    }

    get gameModel() {
        return this._gameModel;
    }

    set playerModel(value) {
        this._playerModel = value;
    }

    get playerModel() {
        return this._playerModel;
    }

    public init(): void {
        //
    }

    public initGameModel(): void {
        this._gameModel = new GameModel();
        this._gameModel.init();
    }

    public destroyGameModel() {
        (this._gameModel as GameModel).destroy();
        this._gameModel = null;
    }

    public initPlayerModel(): void {
        this._playerModel = new PlayerModel();
        this._playerModel.init();
    }

    public destroyPlayerModel(): void {
        (this._playerModel as PlayerModel).destroy();
        this._playerModel = null;
    }
}

const Head = new HeadModel();

export default Head;
