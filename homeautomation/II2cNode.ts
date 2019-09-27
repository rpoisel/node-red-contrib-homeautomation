import { Node } from "node-red";

export interface II2cNode extends Node {
    // the following property will actually be a specific object
    // representing the connection to the I2C bus
    bus: string;
    pollfreq: number;
    busHandle: any;
}
