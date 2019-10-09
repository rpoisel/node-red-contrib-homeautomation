import { Node, NodeProperties, Red } from "node-red";
import { Blind } from "./Blind";
import { IOCmd } from "./IOCmd";
import { IOMsg } from "./IOMsg";

interface IBlindNode extends Node {
    blind: Blind;
}

interface IBlindProperties extends NodeProperties {
    in0: string;
    in1: string;
    out0: string;
    out1: string;
}

export = (RED: Red) => {
    RED.nodes.registerType("blind", function (this: IBlindNode, props: IBlindProperties) {
        this.name = props.name;
        this.blind = new Blind();

        this.on("input", (msg: IOMsg) => {
            // const ioCmd = msg.payload as IOCmdDigital;

            // const in0Node = RED.nodes.getNode(props.in0) as Node;
            // const in1Node = RED.nodes.getNode(props.in1) as Node;
            const out0Node = RED.nodes.getNode(props.out0) as Node;
            const out1Node = RED.nodes.getNode(props.out1) as Node;

            this.send(new IOMsg([
                new IOCmd(this.name, out0Node.name, true),
                new IOCmd(this.name, out1Node.name, false),
            ]));
        });
        RED.nodes.createNode(this, props);
    });
};
