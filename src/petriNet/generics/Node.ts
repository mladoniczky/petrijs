import {Observable} from "../../event";

export abstract class Node extends Observable {

    protected constructor(private _id: string, public title: string) {
        super();
    }

    get id(): string {
        return this._id;
    }
}
