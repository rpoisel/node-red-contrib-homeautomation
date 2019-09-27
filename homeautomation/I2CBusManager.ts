import { I2cBus, openSync } from "i2c-bus";

export class I2CBusManager {
    private busPath: string;
    private pollfreq: number;
    private busHandle: number;
    private listeners: Set<(busHandle: number) => void>;
    private cycleFuncHandle: NodeJS.Timeout;

    public constructor(busPath: string, pollfreq: number) {
        this.busPath = busPath;
        this.pollfreq = pollfreq;

        // TODO open bus
        this.busHandle = 42;

        this.listeners = new Set<(busHandle: number) => void>();
        this.cycleFuncHandle = setInterval(() => {
            this.listeners.forEach((listener) => {
                listener(this.busHandle);
            });
        }, this.pollfreq);
    }

    public getBusPath(): string {
        return this.busPath;
    }
    public subscribeListener(listener: (busHandle: number) => void) {
        this.listeners.add(listener);
    }

    public unsubscribeListener(listener: (busHandle: number) => void) {
        this.listeners.delete(listener);
    }

    public close() {
        clearInterval(this.cycleFuncHandle);
        this.cycleFuncHandle = null;
        this.listeners.clear();
        // TODO close bus
    }
}
