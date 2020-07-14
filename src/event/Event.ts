export default abstract class Event {
    readonly id: string;
    readonly type: string;
    message: string;
    data: Object;

    constructor(id: string, type: string, message: string) {
        this.id = id;
        this.type = type;
        this.message = message;
    }
}
