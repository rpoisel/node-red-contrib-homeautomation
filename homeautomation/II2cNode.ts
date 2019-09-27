import { Node } from "node-red";
import { I2CBusManager } from "./I2CBusManager";

export interface II2cNode extends Node {
    i2cBusManager: I2CBusManager;
}
