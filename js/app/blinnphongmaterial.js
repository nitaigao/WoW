function BlinnPhongMaterial() { }

BlinnPhongMaterial.prototype.init = function(renderer, cb) {
  this.shader = new Shader();

  var material = this;
  var t = Math.random();
  $.get('/shaders/lighting_vertex.glsl?t=' + t, function(vertexSource) {
    $.get('/shaders/lighting_fragment.glsl?t=' + t, function(fragmentSource) {
      material.shader.compile(renderer, vertexSource, fragmentSource);
      cb();
    });
  });
}

BlinnPhongMaterial.prototype.activate = function(renderer, lights, projection, view, model) {
  this.shader.use(renderer);
  this.shader.setUniform(renderer, "projection", projection);
  this.shader.setUniform(renderer, "view", view);
  this.shader.setUniform(renderer, "model", model);

  var modelView = mat4.create();
  mat4.identity(modelView);
  mat4.multiply(view, model, modelView);

  // this.shader.setUniform(renderer, "modelView", modelView);

  var invTransWorld = mat4.create();
  mat4.identity(invTransWorld);

  mat4.inverse(model, invTransWorld);
  mat4.transpose(invTransWorld, invTransWorld);

  this.shader.setUniform(renderer, "normalMatrix", invTransWorld);

  var pointLightPositions = [];
  var pointLightColors = [];

  for (var i = 0; i < lights.length; i++) {
    var light = lights[i];
    var position = lights[i].position();
    pointLightPositions.push(position[0]);
    pointLightPositions.push(position[1]);
    pointLightPositions.push(position[2]);

    pointLightColors.push(light.color.r);
    pointLightColors.push(light.color.g);
    pointLightColors.push(light.color.b);
  }

  this.shader.setUniformV(renderer, "PointLightPosition", pointLightPositions);
  this.shader.setUniformV(renderer, "PointLightColor", pointLightColors);
}
