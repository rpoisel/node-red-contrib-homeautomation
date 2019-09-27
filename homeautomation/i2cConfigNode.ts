import { NodeProperties, Red } from "node-red";

import { I2CBusManager } from "./I2CBusManager";
import { II2cNode } from "./II2cNode";

interface II2cConfigProperties extends NodeProperties {
    bus: string;
    pollfreq: number;
}

export = (RED: Red) => {
    RED.nodes.registerType("i2cConfig", function (this: II2cNode, props: II2cConfigProperties) {
        RED.nodes.createNode(this, props);

        this.i2cBusManager = new I2CBusManager(props.bus, props.pollfreq);
        this.on("close", () => { this.i2cBusManager.close(); });
    });
};
