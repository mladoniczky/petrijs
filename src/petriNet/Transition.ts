import Node from "./generics/Node";
import InputArc from "./arcs/InputArc";
import OutputArc from "./arcs/OutputArc";
import PetriNet from "./PetriNet";

enum TransitionState {
    DISABLED,
    ENABLED,
    TRIGGERED
}

export default class Transition extends Node {

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

    public checkStateChange(): void {
        if (this._state === TransitionState.TRIGGERED)
            return;
        const enoughResources = Array.from(this._inputArcs.values()).every(arc => arc.check());
        this._state = enoughResources ? TransitionState.ENABLED : TransitionState.DISABLED;
    }

    public fire(): void {
        if (this.isEnabled()) {
            this._inputArcs.forEach(arc => arc.moveResources());
            this._state = TransitionState.TRIGGERED;
            this._net.recalculateStates();
            this._outputArcs.forEach(arc => arc.moveResources());
            this._state = TransitionState.DISABLED;
            this._net.recalculateStates();
        } else
            throw new Error(`Transition[${this.id}] ${this.title} cannot be fire because is not enabled!`);
    }
}
