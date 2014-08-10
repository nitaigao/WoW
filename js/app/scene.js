function Scene() {
  this.nodes = []
}

Scene.prototype.addNode = function(node) {
  this.nodes.push(node);
}

Scene.prototype.allNodes = function() {
  return this.nodes;
}
