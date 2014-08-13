function SubMesh() {
  this.submeshes = []
}

SubMesh.prototype.init = function(renderer, vertices, normals, indices, cb) {
  this.material = new BlinnPhongMaterial();
  this.buffer = renderer.createVertexBuffer(vertices, normals, indices, 3, indices.length);

  this.material.init(renderer, function() {
    cb();
  })
}

SubMesh.prototype.render = function(renderer, lights, projection, view, model) {
  this.material.activate(renderer, lights, projection, view, model);
  renderer.renderBuffer(this.buffer);
}
