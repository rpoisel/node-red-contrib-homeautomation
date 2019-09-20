import { Red, Node, NodeProperties } from 'node-red';
import { Blind } from './Blind';
import { IOMsg, IOCmdDigital } from './Commands';

interface BlindNode extends Node {
    blind: Blind;
}

export = (RED: Red) => {
    RED.nodes.registerType("blind", function (this: BlindNode, props: NodeProperties) {
        this.blind = new Blind(props.name);

        this.on('input', function (msg: any) {
            // evaluate message and invoke blind instance
            let cmdDigital = new IOCmdDigital(props.name, true); // this command should actually be emitted by the blind instance
            let response = new IOMsg(cmdDigital);
            this.send(response);
        });
        RED.nodes.createNode(this, props);
    });
};
