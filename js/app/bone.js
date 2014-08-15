function Skeleton() {
  this.bones = []
}

function Bone() {
  this.parent = null;
  this.transform = mat4.create();
}

Bone.prototype.finalTransform = function() {
  if (this.parent != null) {
    var finalTransform = mat4.create();
    var parentTransform = this.parent.finalTransform();
    mat4.multiply(finalTransform, this.transform, parentTransform)
    return finalTransform;
  }
  return this.transform;
}