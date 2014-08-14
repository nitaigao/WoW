function PlaneMesh() {
  this.material = null;
}

PlaneMesh.prototype.init = function(renderer) {
  this.material = new BasicMaterial();
  this.material.init(renderer);

  var vertices = [
     1.0,  1.0,  0.0,
    -1.0,  1.0,  0.0,
     1.0, -1.0,  0.0,
    -1.0, -1.0,  0.0,
  ];

  var indices = [0, 1, 2, 2, 1, 3];
  this.buffer = renderer.createVertexBuffer(vertices, indices, 3, 6);
}

PlaneMesh.prototype.render = function(renderer, lights, projection, view) {
  this.material.activate(renderer,lights, projection, view);
  renderer.renderBuffer(this.buffer);
}

PlaneMesh.prototype.update = function(time, dt) {

}