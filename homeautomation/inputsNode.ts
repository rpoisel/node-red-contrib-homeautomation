import { II2cNode } from "II2cNode";
import { Node, NodeProperties, Red } from "node-red";

interface IInputsNode extends Node {
    bus: II2cNode;
}

interface IInputsProperties extends NodeProperties {
    bus: string;
    address: number;
}

export = (RED: Red) => {
    RED.nodes.registerType("inputs", function (this: IInputsNode, props: IInputsProperties) {
        this.on("input", function (msg: any) {
            this.send(msg);
        });
        if (!props.bus) {
            this.error("Cannot find assigned bus object!");
            // TODO throw exception?
        }
        this.bus = RED.nodes.getNode(props.bus) as II2cNode;
        this.log("Configured I2C bus: " + this.bus.bus + " with a handle of " + this.bus.busHandle);
        RED.nodes.createNode(this, props);
    });
};
