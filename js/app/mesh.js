function Mesh() {
  this.material = new BlinnPhongMaterial();

  this.localToWorld = null;
  this.localToWorld = mat4.create();
  mat4.identity(this.localToWorld);
  mat4.translate(this.localToWorld, [0, 0, -10], this.localToWorld)

  this.submeshes = []
  this.skeletons = []
}

Mesh.prototype.render = function(renderer, lights, projection, view) {
  var self = this;
  _.each(this.submeshes, function(submesh) {
    submesh.render(renderer, lights, projection, view, self.localToWorld);
  });
}

Mesh.prototype.update = function(time, dt) {
  var translation = Math.sin(time * 0.001);
  _.each(this.skeletons, function(skeleton) {
    skeleton.translation = [translation * 10, 0, 0];
  });
}

Mesh.prototype.load = function(renderer, path, cb) {
  var self = this;
  $.get(path, function(data) {
    var submeshesData = data.submeshes;

    function loadNextSubMesh(submeshesData) {
      var submeshData = submeshesData.pop();
      var submesh = new SubMesh();
      console.log(submeshData);
      submesh.init(renderer, submeshData.vertices, submeshData.normals, submeshData.indices, function() {
        self.submeshes.push(submesh);
        if (submeshesData.length) {
          loadNextSubMesh(submeshesData)
        }
        else {
          cb();
        }
      });
    }

    loadNextSubMesh(submeshesData)

    _.each(data.armatures, function(armatureData) {
      var bone = new Bone();
      var boneData = armatureData.bones[0];
      bone.name = boneData.name;
      bone.position = vec3.create(boneData.translation.x, boneData.translation.y, boneData.translation.z)
      self.skeletons.push(bone);
    });
  });
}
