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

    function loadNextModel(models) {
      var model = models.pop();
      var mesh = new Mesh();
      mesh.load(renderer, model.path + "?t=" + Math.random(), function() {
        self.addNode(mesh);
        if (models.length) {
          loadNextModel(models);
        }
      });
    }

    loadNextModel(scene.models);

    _.each(scene.lights, function(data) {
      var light = new PointLight(data);
      self.addLight(light);
    });

  });
}
