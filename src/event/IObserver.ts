import {Event} from "./Event";

export interface IObserver {
    react<T extends Event>(event: T): void;
}
