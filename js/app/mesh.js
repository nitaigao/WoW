function Mesh() {
  this.localToWorld = null;
}

Mesh.prototype.init = function(renderer, vertices, normals, indices) {
  this.localToWorld = mat4.create();
  mat4.identity(this.localToWorld);
  mat4.translate(this.localToWorld, [0, 0, -10], this.localToWorld)
  this.material = new BlinnPhongMaterial();
  this.buffer = renderer.createVertexBuffer(vertices, normals, indices, 3, indices.length);
}

Mesh.prototype.render = function(renderer, lights, projection, view) {
  this.material.activate(renderer, lights, projection, view, this.localToWorld);
  renderer.renderBuffer(this.buffer);
}

Mesh.prototype.load = function(renderer, path, cb) {
  var self = this;
  $.get(path, function(data) {
    self.init(renderer, data.vertices, data.normals, data.indices);
    self.material.init(renderer, function() {
      cb();
    });
  });
}
