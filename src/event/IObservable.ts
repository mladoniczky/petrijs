import {IObserver} from "./IObserver";
import {Event} from "./Event";

export interface IObservable {
    readonly observers: Map<string, IObserver[]>;

    on(event: string, observer: IObserver): IObservable;

    off(event: string, observer: IObserver): IObservable;

    emit<T extends Event>(event: T): void;
}
