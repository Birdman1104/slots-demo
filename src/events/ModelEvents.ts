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
    SpinButtonUpdate: 'SlotMachineModelSpinButtonUpdate',
};

export const SlotModelEvents = { StateUpdate: 'SlotModelStateUpdate', TypeUpdate: 'SlotModelTypeUpdate' };

export const SpinButtonModelEvents = {
    StateUpdate: 'SpinButtonModelStateUpdate',
    ActiveUpdate: 'SpinButtonModelActiveUpdate',
};
