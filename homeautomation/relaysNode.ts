import { Red, Node, NodeProperties } from 'node-red';
import { Relays } from './Relays';

interface RelaysNode extends Node {
    relays: Relays;
}

export = (RED: Red) => {
    RED.nodes.registerType("relays", function (this: RelaysNode, props: NodeProperties) {
        this.relays = new Relays(props.name);

        this.on('input', function (msg: any) {
            this.relays.writeOutputs(msg);
        });
        RED.nodes.createNode(this, props);
    });
};