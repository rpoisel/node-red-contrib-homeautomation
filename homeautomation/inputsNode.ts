import { Node, NodeProperties, Red } from "node-red";

export = (RED: Red) => {
    RED.nodes.registerType("inputs", function (this: Node, props: NodeProperties) {
        // this.blind = new Blind(props.name);

        this.on("input", function (msg: any) {
            this.send(msg);
        });
        RED.nodes.createNode(this, props);
    });
};
