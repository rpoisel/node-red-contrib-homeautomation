import { Node, NodeProperties, Red } from "node-red";

interface IInputsProperties extends NodeProperties {
    address: number;
}

export = (RED: Red) => {
    RED.nodes.registerType("inputs", function (this: Node, props: IInputsProperties) {
        this.on("input", function (msg: any) {
            this.send(msg);
        });
        RED.nodes.createNode(this, props);
    });
};
