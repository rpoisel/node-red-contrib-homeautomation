import { Red, Node, NodeProperties } from 'node-red';

interface InputsNode extends Node {
    // blind: Blind;
}

export = (RED: Red) => {
    RED.nodes.registerType("inputs", function (this: InputsNode, props: NodeProperties) {
        // this.blind = new Blind(props.name);

        this.on('input', function (msg: any) {
            this.send(msg);
        });
        RED.nodes.createNode(this, props);
    });
};
