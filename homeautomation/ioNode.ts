import { Node, NodeProperties, Red } from "node-red";

export = (RED: Red) => {
    RED.nodes.registerType("io", function (this: Node, props: NodeProperties) {
        RED.nodes.createNode(this, props);
    });
};
