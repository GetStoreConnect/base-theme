declare class EventEmitter {
    events: {};
    on: (eventName: string, fn: Function) => void;
    off: (eventName: string, fn: Function) => void;
    emit: (eventName: string, data: any) => void;
}
export default EventEmitter;
