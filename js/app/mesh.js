function Mesh() {
  this.localToWorld = null;
}

Mesh.prototype.init = function(renderer, vertices, normals, indices) {
  this.localToWorld = mat4.create();
  mat4.identity(this.localToWorld);

  this.material = new BasicMaterial();
  this.material.init(renderer);
  this.buffer = renderer.createVertexBuffer(vertices, normals, indices, 3, indices.length);
}

Mesh.prototype.render = function(renderer, projection, view) {
  var modelView = mat4.create();
  mat4.identity(modelView);
  mat4.multiply(view, this.localToWorld, modelView);

  this.material.activate(renderer, projection, modelView);
  renderer.renderBuffer(this.buffer);
}
