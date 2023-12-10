import { lego } from '@armathai/lego';

const getUUID = (() => {
    let i = 0;
    return (name = '') => `${name}${++i}`;
})();

export class ObservableModel {
    protected __name__: string;
    protected id: string;

    constructor(name) {
        this.__name__ = name;
        this.id = getUUID(this.__name__);
    }

    get uuid() {
        return this.id;
    }

    protected setCustomID(id: string): void {
        this.id = id;
    }

    protected makeObservable(...props): void {
        lego.observe.makeObservable(this, ...props);
    }

    protected createObservable(property, value): void {
        lego.observe.createObservable(this, property, value);
    }

    protected removeObservable(...properties): void {
        lego.observe.removeObservable(this, ...properties);
    }

    public init(...args): void {
        void args;
    }

    public destroy(): void {
        //
    }
}
