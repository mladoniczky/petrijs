import {Transition} from "../Transition";
import {Place} from "../Place";
import {Arc} from "./Arc";

export class OutputArc extends Arc<Transition, Place> {

    constructor(id: string, source: Transition, target: Place) {
        super(id, source, target);
    }

    moveResources(): void {
        this.target.increaseResources();
    }
}
