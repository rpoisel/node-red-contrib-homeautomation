import { Node, NodeProperties, Red } from "node-red";
import { Blind } from "./Blind";
import { IOCmdDigital } from "./IOCmdDigital";
import { IOMsg } from "./IOMsg";

interface IBlindNode extends Node {
    blind: Blind;
}

export = (RED: Red) => {
    RED.nodes.registerType("blind", function (this: IBlindNode, props: NodeProperties) {
        this.blind = new Blind(props.name);

        this.on("input", function (msg: any) {
            // evaluate message and invoke blind instance

            // the following command should actually be emitted by the blind instance
            const cmdDigital = new IOCmdDigital(props.name, true);
            const response = new IOMsg(cmdDigital);
            this.send(response);
        });
        RED.nodes.createNode(this, props);
    });
};
