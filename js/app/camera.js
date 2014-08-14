function Camera() {
  this.localToWorld = mat4.create();
  mat4.identity(this.localToWorld);
}

Camera.prototype.view = function() {
  var view = mat4.create();
  mat4.identity(view);
  mat4.invert(view, this.localToWorld);
  return view;
}

Camera.prototype.translate = function(translation) {
  mat4.translate(this.localToWorld, this.localToWorld, translation);
}

Camera.prototype.rotate = function(radians, axis) {
  mat4.rotate(this.localToWorld, radians, axis);
}
