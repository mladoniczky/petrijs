import {IObservable} from "./IObservable";
import {IObserver} from "./IObserver";
import {Event} from "./Event";

export abstract class Observable implements IObservable {
    readonly observers: Map<string, IObserver[]>;

    constructor() {
        this.observers = new Map<string, IObserver[]>();
    }

    emit<T extends Event>(event: T): void {
        const observers = this.observers.get(event.type);
        observers && observers.forEach(observer => observer.react(event));
    }

    off(event: string, observer: IObserver): IObservable {
        const observers = this.observers.get(event);
        if (observers) {
            const obs = observers.findIndex(o => o === observer);
            if (obs !== -1) {
                observers.splice(obs, 1);
                this.observers.set(event, observers);
            }
        }
        return this;
    }

    on(event: string, observer: IObserver): IObservable {
        const observers = this.observers.get(event);
        if (observers) {
            const ob = observers.find(o => o === observer);
            if (!ob) {
                observers.push(observer);
                this.observers.set(event, observers);
            }
        } else {
            this.observers.set(event, [observer]);
        }
        return this;
    }

}
