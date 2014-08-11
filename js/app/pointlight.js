function PointLight(data) {
  this.localToWorld = mat4.create();
  mat4.identity(this.localToWorld);
  mat4.translate(this.localToWorld, [data.position.x, data.position.y, data.position.z])
  this.color = data.color;
}

PointLight.prototype.position = function() {
  return vec3.create([this.localToWorld[12], this.localToWorld[13], this.localToWorld[14]])
}
