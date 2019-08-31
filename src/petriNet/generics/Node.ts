export default class Node {

    constructor(private _id: string, public title: string) {
    }

    get id(): string {
        return this._id;
    }
}
