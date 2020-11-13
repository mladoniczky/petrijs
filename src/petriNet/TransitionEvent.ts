import {Event} from "../event";
import {Transition} from "./Transition";

export enum TransitionEventType {
    BECOME_ENABLED = "BECOME_ENABLED",
    BECOME_DISABLED = "BECOME_DISABLED",
    CONSUMING = "CONSUMING_ RESOURCES",
    PRODUCING = "PRODUCING_RESOURCES"
}

export class TransitionEvent extends Event {
    readonly transition: Transition;
    private static lastId = 0;

    constructor(type: string, message: string, transition: Transition) {
        super((TransitionEvent.lastId++) + "", type, message);
        this.transition = transition;
    }
}
