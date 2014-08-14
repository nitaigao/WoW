function Mesh() {
  this.material = new BlinnPhongMaterial();

  this.localToWorld = mat4.create();
  mat4.identity(this.localToWorld);
  mat4.translate(this.localToWorld, this.localToWorld, [0, 0, -6])

  this.submeshes = []
  this.skeletons = []
}

Mesh.prototype.render = function(renderer, lights, projection, view) {
  _.each(this.submeshes, function(submesh) {
    var skels = []
    for (var i = 0; i < this.skeletons.length; i++) {
      var skeleton = this.skeletons[i];
      if (skeleton.name === submesh.skeleton) {
        skels.push(skeleton);
        break;
      }
    }

    var skeleton = _.first(skels);
    var boneData = []

    if (skeleton) {
      _.each(skeleton.bones, function(bone) {
        _.each(bone, function(element) {
          boneData.push(element);
        }, this)
      }, this);
    }

    submesh.render(renderer, lights, boneData, projection, view, this.localToWorld);
  }, this);
}

Mesh.prototype.update = function(time, dt) {
  // var translation = Math.sin(time * 0.001);
  // _.each(this.skeletons, function(skeleton) {
  //   skeleton.translation = [translation * 10, 0, 0];
  // });
}

Mesh.prototype.load = function(renderer, path, cb) {
  var self = this;
  $.get(path, function(data) {
    _.each(data.armatures, function(armatureData) {
      var skeleton = new Skeleton();
      skeleton.name = armatureData.name;
      _.each(armatureData.bones, function(boneData) {
        var translation = vec3.fromValues(boneData.translation.x, boneData.translation.y, boneData.translation.z)
        var orientation = quat.fromValues(boneData.orientation.x, boneData.orientation.y, boneData.orientation.z, boneData.orientation.w);
        var bone = mat4.create();
        mat4.fromRotationTranslation(bone, orientation, translation);
        skeleton.bones.push(bone)
      });
      self.skeletons.push(skeleton);
    });

    var submeshesData = data.submeshes;

    function loadNextSubMesh(submeshesData) {
      var submeshData = submeshesData.pop();
      var submesh = new SubMesh();
      submesh.skeleton = submeshData.armature;

      var boneIndices = []
      var boneWeights = []
      _.each(submeshData.weights, function(weights) {
        _.each(weights, function(weight) {
          boneIndices.push(weight.index);
          boneWeights.push(weight.weight);
        });

        var filler = 4 - weights.length
        for (var i = 0; i <  filler; i++) {
          boneIndices.push(0);
          boneWeights.push(0);
        } 
      });

      submesh.init(renderer, submeshData.vertices, submeshData.normals, submeshData.indices, boneIndices, boneWeights, function() {
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
  });
}
