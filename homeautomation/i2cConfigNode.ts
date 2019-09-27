import { II2cNode } from "II2cNode";
import { NodeProperties, Red } from "node-red";

interface II2cConfigProperties extends NodeProperties {
    bus: string;
    pollfreq: number;
}

export = (RED: Red) => {
    RED.nodes.registerType("i2cConfig", function (this: II2cNode, props: II2cConfigProperties) {
        RED.nodes.createNode(this, props);

        // TODO other nodes might also should do any action after creating the node
        this.bus = props.bus;
        this.pollfreq = props.pollfreq;
        this.busHandle = 42;
        this.log("I2C config node is being established to " + this.bus);
        this.on("close", () => { this.log("I2C connection to " + this.bus + " could be closed now."); });
    });
};
