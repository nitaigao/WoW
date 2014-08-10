function WebGLRenderer(canvas) {
  this.canvas = canvas;
  this.clearColor = {red:0.8, green:0.4, blue:0.3, alpha:1}
  this.gl = null;
}

WebGLRenderer.prototype.init = function() {
  this.gl = this.canvas.getContext("webgl");
  this.gl.viewportWidth = this.canvas.width;
  this.gl.viewportHeight = this.canvas.height;

  var renderer = this;
  window.addEventListener('resize', resizeCanvas, false);
  function resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    renderer.gl.viewportWidth = this.canvas.width;
    renderer.gl.viewportHeight = this.canvas.height;
  }
  resizeCanvas();
}

WebGLRenderer.prototype.clear = function(red, green, blue, alpha) {
  this.clearColor.red = red;
  this.clearColor.green = green;
  this.clearColor.blue = blue;
  this.clearColor.alpha = alpha;
}

WebGLRenderer.prototype.beginFrame = function() {
  this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
  this.gl.clearColor(this.clearColor.red, this.clearColor.green, this.clearColor.blue, this.clearColor.alpha);
  this.gl.enable(this.gl.DEPTH_TEST);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
}

WebGLRenderer.prototype.createVertexBuffer = function(vertices, normals, indices, itemSize, numItems) {
  var buffer = {}

  var vertexBuffer = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

  var normalsBuffer = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalsBuffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normals), this.gl.STATIC_DRAW);

  var indexBuffer = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

  buffer.vertexBuffer = vertexBuffer;
  buffer.normalsBuffer = normalsBuffer;
  buffer.indexBuffer = indexBuffer;
  buffer.itemSize = itemSize;
  buffer.numItems = numItems;

  return buffer;
}

WebGLRenderer.prototype.renderBuffer = function(buffer) {
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.vertexBuffer);
  this.gl.vertexAttribPointer(0, buffer.itemSize, this.gl.FLOAT, false, 0, 0);

  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.normalsBuffer);
  this.gl.vertexAttribPointer(1, buffer.itemSize, this.gl.FLOAT, false, 0, 0);

  this.gl.drawElements(this.gl.TRIANGLES, buffer.numItems, this.gl.UNSIGNED_SHORT, 0);
}

WebGLRenderer.prototype.compileShaderSource = function(shaderType, sourceCode) {
  var shader = this.gl.createShader(shaderType);
  this.gl.shaderSource(shader, sourceCode);
  this.gl.compileShader(shader);

  if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
    console.error("Error compiling shader source:", sourceCode)
    console.error(this.gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}
