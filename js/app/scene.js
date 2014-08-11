function Scene() {
  this.nodes = []
  this.lights = []
}

Scene.prototype.addNode = function(node) {
  this.nodes.push(node);
}

Scene.prototype.allNodes = function() {
  return this.nodes;
}

Scene.prototype.addLight = function(light) {
  this.lights.push(light)
}

Scene.prototype.allLights = function() {
  return this.lights;
}

Scene.prototype.load = function(path, renderer) {
  var self = this;
  $.get(path, function(scene) {

    _.each(scene.models, function(model) {
      var mesh = new Mesh();
      mesh.load(renderer, model.path + "?t=" + Math.random(), function() {
        self.addNode(mesh);
      });
    });

    _.each(scene.lights, function(data) {
      var light = new PointLight(data);
      self.addLight(light);
    });

  });
}
