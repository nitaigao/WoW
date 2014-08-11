function Shader() {
  this.shaderProgram = null;
}

Shader.prototype.compile = function(renderer, vertexSource, fragmentSource) {
  var vertexShader = renderer.compileShaderSource(renderer.gl.VERTEX_SHADER, vertexSource);
  var fragmentShader = renderer.compileShaderSource(renderer.gl.FRAGMENT_SHADER, fragmentSource);

  this.shaderProgram = renderer.gl.createProgram();
  renderer.gl.attachShader(this.shaderProgram, vertexShader);
  renderer.gl.attachShader(this.shaderProgram, fragmentShader);
  renderer.gl.linkProgram(this.shaderProgram);

  if (!renderer.gl.getProgramParameter(this.shaderProgram, renderer.gl.LINK_STATUS)) {
    console.error(renderer.gl.getProgramInfoLog(this.shaderProgram));
    throw "Could not link shader"
  }

  renderer.gl.enableVertexAttribArray(0);
  renderer.gl.enableVertexAttribArray(1);
}

Shader.prototype.use = function(renderer) {
  renderer.gl.useProgram(this.shaderProgram);
}

Shader.prototype.setUniformV = function(renderer, name, values) {
  var uniformLocation = renderer.gl.getUniformLocation(this.shaderProgram, name);
  renderer.gl.uniform3fv(uniformLocation, values);
}

Shader.prototype.setUniform3 = function(renderer, name, value) {
  var uniformLocation = renderer.gl.getUniformLocation(this.shaderProgram, name);
  renderer.gl.uniformMatrix3fv(uniformLocation, false, value);
}

Shader.prototype.setUniform = function(renderer, name, value) {
  var uniformLocation = renderer.gl.getUniformLocation(this.shaderProgram, name);
  renderer.gl.uniformMatrix4fv(uniformLocation, false, value);
}
