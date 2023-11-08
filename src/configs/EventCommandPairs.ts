import { lego } from '@armathai/lego';
import { MIN_BET } from '../Config';
import { MainGameEvents } from '../events/MainEvents';
import { GameModel } from '../models/GameModel';
import Head from '../models/HeadModel';
import { PlayerModel } from '../models/PlayerModel';

export const mapCommands = (): void => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = (): void => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const onMainViewReadyCommand = (): void => {
    Head.init();
    Head.initGameModel();
};

const initModelsCommand = (): void => {
    Head.init();
    Head.initGameModel();
    Head.initPlayerModel();

    (Head.playerModel as PlayerModel).bet = MIN_BET;
    (Head.gameModel as GameModel).idleSlotMachine();
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: initModelsCommand,
    },
]);
