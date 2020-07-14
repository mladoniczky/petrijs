import Transition from "./Transition";
import Place from "./Place";

export default class PetriNet {

    private _transitions: Map<string, Transition>;
    private _places: Map<string, Place>;

    constructor(private _id: string, public title: string) {
        this._transitions = new Map<string, Transition>();
        this._places = new Map<string, Place>();
    }

    public recalculateStates(): void {
        this._transitions.forEach(transition => transition.checkStateChange());
    }

    public fireTransition(transition: string) {
        this._transitions.get(transition) && this._transitions.get(transition).fire();
    }

    public getMarking(): number[] {
        return Array.from(this._places.values()).map(place => place.resources);
    }

    public getEnabledTransitions(): Transition[] {
        return Array.from(this._transitions.values()).filter(transition => transition.isEnabled());
    }

}
