export const ElementModelEvents = { StateUpdate: 'ElementModelStateUpdate', TypeUpdate: 'ElementModelTypeUpdate' };

export const GameModelEvents = { StateUpdate: 'GameModelStateUpdate', SlotMachineUpdate: 'GameModelSlotMachineUpdate' };

export const HeadModelEvents = {
    GameModelUpdate: 'HeadModelGameModelUpdate',
    PlayerModelUpdate: 'HeadModelPlayerModelUpdate',
};

export const PlayerModelEvents = { BalanceUpdate: 'PlayerModelBalanceUpdate', BetUpdate: 'PlayerModelBetUpdate' };

export const ReelModelEvents = { StateUpdate: 'ReelModelStateUpdate' };

export const SlotMachineModelEvents = {
    StateUpdate: 'SlotMachineModelStateUpdate',
    ConfigUpdate: 'SlotMachineModelConfigUpdate',
    ReelsUpdate: 'SlotMachineModelReelsUpdate',
    SpinResultUpdate: 'SlotMachineModelSpinResultUpdate',
    SpinsCountUpdate: 'SlotMachineModelSpinsCountUpdate',
};

export const SpinButtonModelEvents = {
    StateUpdate: 'SpinButtonModelStateUpdate',
    ActiveUpdate: 'SpinButtonModelActiveUpdate',
};
