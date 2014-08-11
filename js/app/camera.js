function Camera() {
  this.localToWorld = mat4.create();
  mat4.identity(this.localToWorld);
}

Camera.prototype.view = function() {
  var view = mat4.create();
  mat4.identity(view);
  mat4.inverse(this.localToWorld, view);
  return view;
}

Camera.prototype.translate = function(translation) {
  mat4.translate(this.localToWorld, translation);
}

Camera.prototype.rotate = function(radians, axis) {
  mat4.rotate(this.localToWorld, radians, axis);
}
