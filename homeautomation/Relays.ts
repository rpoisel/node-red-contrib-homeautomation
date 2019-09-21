import { I2cBus, openSync } from "i2c-bus";

export class Relays {
    private id: string;
    constructor(id: string) {
        this.id = id;
    }
    public getId(): string {
        return this.id;
    }
    public writeOutputs(msg: any): void {
        // nothing to do here for the moment
    }
}
