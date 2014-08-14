function SubMesh() {
  this.submeshes = []
}

SubMesh.prototype.init = function(renderer, vertices, normals, indices, boneIndices, boneWeights, cb) {
  this.material = new BlinnPhongMaterial();
  this.buffer = renderer.createVertexBuffer(vertices, normals, indices, boneIndices, boneWeights, indices.length);

  this.material.init(renderer, function() {
    cb();
  })
}

SubMesh.prototype.render = function(renderer, lights, bones, boneWeights, projection, view, model) {
  this.material.activate(renderer, lights, bones, boneWeights, projection, view, model);
  this.material.bindBuffers(renderer, this.buffer)

  renderer.renderBuffer(this.buffer);
}
