function App() {
  this.renderer = null;
  this.scene = new Scene();
  this.lastTime = 0;
}

App.prototype.init = function(canvas) {
  this.renderer = new WebGLRenderer(canvas);
  this.renderer.init();

  var self = this;
  $.get("/data/models/plane.json", function(data) {
    var mesh = new Mesh();
    mesh.init(self.renderer, data.vertices, data.normals, data.indices);
    self.scene.addNode(mesh);
  });
}

App.prototype.render = function() {
  this.renderer.clear(0.9, 0.4, 0.6, 1.0);

  this.renderer.beginFrame();

  var projection = mat4.create();
  mat4.identity(projection);
  mat4.perspective(45, this.renderer.gl.viewportWidth / this.renderer.gl.viewportHeight, 0.1, 100.0, projection);

  var camera = new Camera();
  camera.translate([0.0, 0.0, 4.0])

  var view = camera.view();

  var nodes = this.scene.allNodes();
  _.each(nodes, function(node) {
    node.render(this.renderer, projection, view)
  }, this);
}

App.prototype.update = function(time) {
  var dt = (time - this.lastTime) / 1000;
  this.lastTime = time;
  var nodes = this.scene.allNodes();
  _.each(nodes, function(node) {
    var rotation = mat4.create();
    mat4.identity(rotation);
    mat4.rotate(rotation, dt, [1.0, 1.0, 0.0]);
    mat4.multiply(node.localToWorld, rotation, node.localToWorld);
  }, this);
}
