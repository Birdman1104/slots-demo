import { lego } from '@armathai/lego';

const getUUID = (() => {
    let i = 0;
    return (name = '') => `${name}${++i}`;
})();

export class ObservableModel {
    protected __name__: string;
    private id: string;

    constructor(name) {
        this.__name__ = name;
        this.id = getUUID(this.__name__);
    }

    get uuid() {
        return this.id;
    }

    makeObservable(...props) {
        lego.observe.makeObservable(this, ...props);
    }

    createObservable(property, value) {
        lego.observe.createObservable(this, property, value);
    }

    removeObservable(...properties) {
        lego.observe.removeObservable(this, ...properties);
    }

    init(...args) {
        void args;
    }

    destroy() {
        //
    }
}
