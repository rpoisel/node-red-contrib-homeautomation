import { II2cNode } from "II2cNode";
import { Node, NodeProperties, Red } from "node-red";

interface IInputsNode extends Node {
    busNode: II2cNode;
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
        this.busNode = RED.nodes.getNode(props.bus) as II2cNode;
        this.log("Configured I2C bus @ " + this.busNode.i2cBusManager.getBusPath() + ".");

        this.busNode.i2cBusManager.subscribeListener((busHandle: number) => {
            const msg = {
                payload: "Input node " + this.name + " at bus " + busHandle,
            };
            this.send(msg);
        });

        RED.nodes.createNode(this, props);
    });
};
