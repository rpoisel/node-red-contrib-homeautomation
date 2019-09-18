import { Red, Node, NodeProperties } from 'node-red';
import { Blind } from './Blind';

interface BlindNode extends Node {
    blind: Blind;
}

export = (RED: Red) => {
    RED.nodes.registerType("blind", function (this: BlindNode, props: NodeProperties) {
        this.blind = new Blind(props.name);

        this.on('input', function (msg: any) {
            msg.payload = msg.payload.toLowerCase() + " from " + this.blind.getId();
            this.send(msg);
        });
        RED.nodes.createNode(this, props);
    });
};
