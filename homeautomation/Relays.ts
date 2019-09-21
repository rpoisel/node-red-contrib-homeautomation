import { I2cBus, openSync } from 'i2c-bus';

export class Relays {
    id: string;
    constructor(id: string) {
        this.id = id;
    }
    getId(): string {
        return this.id;
    }
    writeOutputs(msg: any): void {

    }
}