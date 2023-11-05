export const GameModelEvents = { StateUpdate: 'GameModelStateUpdate', SlotMachineUpdate: 'GameModelSlotMachineUpdate' };

export const HeadModelEvents = { GameModelUpdate: 'HeadModelGameModelUpdate' };

export const PlayerModelEvents = { BalanceUpdate: 'PlayerModelBalanceUpdate', BetUpdate: 'PlayerModelBetUpdate' };

export const ReelModelEvents = {
    '} = config;\n    config.offset = { x: offset.x || 0, y: offset.y || 0 };\n\n    return config;\n}\n\nexport enum ReelState {\n    Idle,\n    Spin,\n    MaxSpeed,\n    Stop,\n}\n\nexport class ReelModel extends ObservableModel {\n    private _state: ReelState;\n    private _config: any;\n    private _slots: SlotModel[];\n\n    public constructorUpdate':
        'ReelModel} = config;\n    config.offset = { x: offset.x || 0, y: offset.y || 0 };\n\n    return config;\n}\n\nexport enum ReelState {\n    Idle,\n    Spin,\n    MaxSpeed,\n    Stop,\n}\n\nexport class ReelModel extends ObservableModel {\n    private _state: ReelState;\n    private _config: any;\n    private _slots: SlotModel[];\n\n    public constructorUpdate',
    StateUpdate: 'ReelModelStateUpdate',
};

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
