export default interface IObserver {
    react<T extends Event>(event: T): void;
}
