import Arc from "./Arc";
import Place from "../Place";
import Transition from "../Transition";

export default class InputArc extends Arc<Place, Transition> {

    constructor(id: string, source: Place, target: Transition) {
        super(id, source, target);
    }

    check(): boolean {
        return this.source.resources > 0;
    }

    moveResources(): void {
        this.source.deceaseResources();
    }
}
