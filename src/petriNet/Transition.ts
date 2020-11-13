import {Node} from "./generics";
import {InputArc} from "./arcs";
import {OutputArc} from "./arcs";
import PetriNet from "./PetriNet";
import {TransitionEvent, TransitionEventType} from "./TransitionEvent";

enum TransitionState {
    DISABLED,
    ENABLED,
    TRIGGERED
}

export class Transition extends Node {

    private _state: TransitionState;
    private _inputArcs: Map<string, InputArc>;
    private _outputArcs: Map<string, OutputArc>;

    constructor(id: string, title: string, private _net: PetriNet) {
        super(id, title);
        this._state = TransitionState.DISABLED;
        this._inputArcs = new Map<string, InputArc>();
        this._outputArcs = new Map<string, OutputArc>();
    }

    get state(): TransitionState {
        return this._state;
    }

    public isEnabled(): boolean {
        return this._state === TransitionState.ENABLED;
    }

    public test(): void {
        if (this._state === TransitionState.TRIGGERED)
            return;
        const previousState = this._state;
        const enoughResources = Array.from(this._inputArcs.values()).every(arc => arc.check());
        this._state = enoughResources ? TransitionState.ENABLED : TransitionState.DISABLED;
        if (previousState !== this._state) {
            if (this._state === TransitionState.ENABLED)
                this.emit(new TransitionEvent(TransitionEventType.BECOME_ENABLED, "State changed to " + this._state, this));
            else if (this._state === TransitionState.DISABLED)
                this.emit(new TransitionEvent(TransitionEventType.BECOME_DISABLED, "State changed to " + this._state, this));
        }
    }

    public fire(): void {
        if (this.isEnabled()) {
            this._inputArcs.forEach(arc => arc.moveResources());
            this._state = TransitionState.TRIGGERED;
            this._net.recalculateStates();
            this.emit(new TransitionEvent(TransitionEventType.CONSUMING, "Consumed resources", this));
            this._outputArcs.forEach(arc => arc.moveResources());
            this._state = TransitionState.DISABLED;
            this._net.recalculateStates();
            this.emit(new TransitionEvent(TransitionEventType.PRODUCING, "Produced resources", this));
        } else
            throw new Error(`Transition[${this.id}] ${this.title} cannot be fire because is not enabled!`);
    }
}
