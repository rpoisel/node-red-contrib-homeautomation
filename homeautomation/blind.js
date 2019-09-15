class Blind {
  constructor(name, pinUp, pinDown) {
    this.name = name;
    this.pinUp = pinUp;
    this.pinDown = pinDown;
  }
  getInfo()
  {
    return this.name;
  }
}

module.exports = function(RED) {
    function BlindNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            msg.payload = this.blind.getInfo();
            node.send(msg);
        });
        this.blind = new Blind('Sample Window Blind', 1, 2);
    }
    RED.nodes.registerType("blind",BlindNode);
}
