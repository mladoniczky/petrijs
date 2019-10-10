import Observable from "../../event/Observable";

export default abstract class Node extends Observable {

    constructor(private _id: string, public title: string) {
        super();
    }

    get id(): string {
        return this._id;
    }
}
