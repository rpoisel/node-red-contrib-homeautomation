import { Node, NodeProperties, Red } from "node-red";
import { Relays } from "./Relays";

interface IRelaysNode extends Node {
    relays: Relays;
}

interface IRelaysProperties extends NodeProperties {
    input0: string;
    input1: string;
    input2: string;
    input3: string;
    input4: string;
    input5: string;
    input6: string;
    input7: string;
}

export = (RED: Red) => {
    RED.nodes.registerType("relays", function (this: IRelaysNode, properties: IRelaysProperties) {
        this.relays = new Relays(properties.name);

        this.on("input", function (msg: any) {
            this.relays.writeOutputs(msg);
        });
        RED.nodes.createNode(this, properties);
    });
};
