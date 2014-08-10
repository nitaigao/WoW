function BasicMaterial() { }

BasicMaterial.prototype.init = function(renderer) {
  this.shader = new Shader();
  this.shader.compile(renderer, NormalsShaderSource.VERTEX_SOURCE, NormalsShaderSource.FRAGMENT_SOURCE);
}

BasicMaterial.prototype.activate = function(renderer, projection, view) {
  this.shader.use(renderer);
  this.shader.setUniform(renderer, "projection", projection);
  this.shader.setUniform(renderer, "view", view);
}
