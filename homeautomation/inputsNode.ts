import { Node, NodeProperties, Red } from "node-red";

import { II2cNode } from "./II2cNode";
import { IOCmd } from "./IOCmd";
import { IOMsg } from "./IOMsg";

interface IInputsNode extends Node {
    busNode: II2cNode;
    in0Node: Node;
    in1Node: Node;
    in2Node: Node;
    in3Node: Node;
    in4Node: Node;
    in5Node: Node;
    in6Node: Node;
    in7Node: Node;
}

interface IInputsProperties extends NodeProperties {
    bus: string;
    address: number;
    in0: string;
    in1: string;
    in2: string;
    in3: string;
    in4: string;
    in5: string;
    in6: string;
    in7: string;

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
        this.in0Node = RED.nodes.getNode(props.in0) as Node;

        this.busNode.i2cBusManager.subscribeListener((busHandle: number) => {
            this.send(new IOMsg([
                new IOCmd(this.name, this.in0Node.name, true),
            ]));
        });

        RED.nodes.createNode(this, props);
    });
};
