import Node from "./generics/Node";
import OutputArc from "./arcs/OutputArc";
import InputArc from "./arcs/InputArc";
import PetriNet from "./PetriNet";

export default class Place extends Node {

    private _inputArcs: Map<string, OutputArc>;
    private _outputArcs: Map<string, InputArc>;

    constructor(id: string, title: string, private _resources: number = 0, private net: PetriNet) {
        super(id, title);
        this._inputArcs = new Map<string, OutputArc>();
        this._outputArcs = new Map<string, InputArc>();
    }

    get resources(): number {
        return this._resources;
    }

    public increaseResources(amount: number = 1): void {
        this._resources += amount;
    }

    public deceaseResources(amount: number = 1): void {
        this._resources -= amount;
    }
}
