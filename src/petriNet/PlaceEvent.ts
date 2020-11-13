import {Place} from "./Place";
import {Event} from "../event";

export enum PlaceEventType {
    RESOURCES_INCREASED = "RESOURCES_INCREASED",
    RESOURCES_DECREASED = "RESOURCES_DECREASED"
}

export class PlaceEvent extends Event {
    readonly place: Place;
    private static lastId = 0;

    constructor(type: string, message: string, place: Place) {
        super((PlaceEvent.lastId++) + "", type, message);
        this.place = place;
    }
}
