function App() {
  this.renderer = null;
  this.scene = new Scene();
  this.lastTime = 0;
  this.camera = new Camera();
  // this.controls = new FlyControls(this.camera);
}

App.prototype.init = function(canvas) {
  this.renderer = new WebGLRenderer(canvas);
  this.renderer.init();
  this.camera.translate([0, 1.8, 0]);
}

App.prototype.loadScene = function(path) {
  this.scene.load(path, this.renderer);
}

App.prototype.render = function() {
  this.renderer.clear(0.9, 0.4, 0.6, 1.0);
  this.renderer.beginFrame();

  var projection = mat4.create();
  mat4.identity(projection);
  mat4.perspective(projection, 70, this.renderer.gl.viewportWidth / this.renderer.gl.viewportHeight, 0.1, 100.0);

  var view = this.camera.view();

  var lights = this.scene.allLights();
  var nodes = this.scene.allNodes();

  _.each(nodes, function(node) {
    node.render(this.renderer, lights, projection, view);
  }, this);
}

App.prototype.update = function(time) {
  var dt = (time - this.lastTime) / 1000;
  this.lastTime = time;

  // this.controls.update(dt);

  var nodes = this.scene.allNodes();
  _.each(nodes, function(node) {
    node.update(time, dt);
  }, this);

  // var nodes = this.scene.allNodes();
  // _.each(nodes, function(node) {
  //   var rotation = mat4.create();
  //   mat4.identity(rotation);
  //   // mat4.rotate(rotation, dt, [0.0, 1.0, 0.0]);
  //   mat4.multiply(node.localToWorld, rotation, node.localToWorld);
  // }, this);
}
