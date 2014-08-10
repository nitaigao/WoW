function Scene() {
  this.nodes = []
}

Scene.prototype.addNode = function(node) {
  this.nodes.push(node);
}

Scene.prototype.allNodes = function() {
  return this.nodes;
}

Scene.prototype.load = function(path, renderer) {
  var self = this;
  $.get(path, function(scene) {
    _.each(scene.models, function(model) {
      $.get(model.path, function(data) {
        var mesh = new Mesh();
        mesh.init(renderer, data.vertices, data.normals, data.indices);
        self.addNode(mesh);
      });
    });
  });
}
