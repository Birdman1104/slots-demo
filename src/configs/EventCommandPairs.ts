import { lego } from '@armathai/lego';
import { MainGameEvents, SlotMachineViewEvents, UIEvents } from '../events/MainEvents';
import { SlotMachineModelEvents } from '../events/ModelEvents';
import { GameModel } from '../models/GameModel';
import Head from '../models/HeadModel';
import { PlayerModel } from '../models/PlayerModel';
import { SlotMachineState } from '../models/SlotMachineModel';
import { getDefaultPlayerInfo } from '../slotLogic';

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

const initModelsCommand = async (): Promise<void> => {
    const playerInfo = await getDefaultPlayerInfo();
    Head.init();
    Head.initGameModel();
    Head.initPlayerModel();

    (Head.gameModel as GameModel).idleSlotMachine();
    (Head.playerModel as PlayerModel).setPlayerInfo(playerInfo);
};

const spinButtonClickCommand = (): void => {
    Head.playerModel?.spin();
    Head.gameModel?.slotMachine?.spin(Head.playerModel?.bet);
};

const plusButtonClickCommand = (): void => {
    Head.playerModel?.increaseBet();
};

const minusButtonClickCommand = (): void => {
    Head.playerModel?.decreaseBet();
};

const slotMachineOldElementsDropCompleteCommand = (): void => {
    Head.gameModel?.slotMachine?.setState(SlotMachineState.WaitingForResult);
};

const slotMachineNewElementsDropCompleteCommand = (): void => {
    Head.gameModel?.slotMachine?.setState(SlotMachineState.ShowWinLines);
};

const slotMachineStateUpdateCommand = (newState: SlotMachineState, oldState: SlotMachineState): void => {
    if (newState === SlotMachineState.WaitingForResult) {
        Head.gameModel?.slotMachine?.checkForResult();
    }
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: initModelsCommand,
    },
    {
        event: UIEvents.SpinButtonClick,
        command: spinButtonClickCommand,
    },
    {
        event: UIEvents.PlusButtonClick,
        command: plusButtonClickCommand,
    },
    {
        event: UIEvents.MinusButtonClick,
        command: minusButtonClickCommand,
    },
    {
        event: SlotMachineViewEvents.OldElementsDropComplete,
        command: slotMachineOldElementsDropCompleteCommand,
    },
    {
        event: SlotMachineModelEvents.StateUpdate,
        command: slotMachineStateUpdateCommand,
    },
    {
        event: SlotMachineViewEvents.NewElementsDropComplete,
        command: slotMachineNewElementsDropCompleteCommand,
    },
]);
