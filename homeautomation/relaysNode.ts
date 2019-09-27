import { Node, NodeProperties, Red } from "node-red";
import { Relays } from "./Relays";

interface IRelaysNode extends Node {
    relays: Relays;
}

interface IRelaysProperties extends NodeProperties {
    output0: string;
    output1: string;
    output2: string;
    output3: string;
    output4: string;
    output5: string;
    output6: string;
    output7: string;
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
