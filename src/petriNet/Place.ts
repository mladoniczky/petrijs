import {Node} from "./generics";
import {OutputArc} from "./arcs";
import {InputArc} from "./arcs";
import PetriNet from "./PetriNet";
import {PlaceEvent, PlaceEventType} from "./PlaceEvent";

export class Place extends Node {

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
        this.emit(new PlaceEvent(PlaceEventType.RESOURCES_INCREASED, "Resources increased to " + this._resources, this));
    }

    public deceaseResources(amount: number = 1): void {
        this._resources -= amount;
        this.emit(new PlaceEvent(PlaceEventType.RESOURCES_DECREASED, "Resources decreased to " + this._resources, this));
    }
}
