import Node from '../generics/Node';

export default class Arc<T extends Node, R extends Node> {

    constructor(private _id: string, private _source: T, private _target: R) {

    }

    get source(): T {
        return this._source;
    }

    get target(): R {
        return this._target;
    }

    public moveResources():void{}
}
