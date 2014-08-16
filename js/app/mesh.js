function Mesh() {
  this.material = new BlinnPhongMaterial();

  this.localToWorld = mat4.create();
  mat4.identity(this.localToWorld);
  mat4.translate(this.localToWorld, this.localToWorld, [0, 0, -6])

  this.submeshes = []
  this.skeletons = []
  this.animations = []
  this.activeAnimations = []
}

Mesh.prototype.playAnimation = function(name) {
  this.activeAnimations.length = 0;
  this.activeAnimations = _.where(this.animations, {name: name});
}

Mesh.prototype.render = function(renderer, lights, projection, view) {
  _.each(this.submeshes, function(submesh) {
    var boneData = []
    var boneNormalData = []

    _.each(this.activeAnimations, function(animation) {
      var skeleton = animation.frameSkeleton()
      _.each(skeleton.bones, function(bone) {
        var boneTransform = bone.finalTransform();

        _.each(boneTransform, function(element) {
          boneData.push(element);
        }, this)

        var invTransBone = mat4.create();
        mat4.identity(invTransBone);
        mat4.invert(invTransBone, boneTransform);
        mat4.transpose(invTransBone, invTransBone);

        _.each(invTransBone, function(element) {
          boneNormalData.push(element);
        }, this)
      }, this);
    });

    submesh.render(renderer, lights, boneData, boneNormalData, projection, view, this.localToWorld);
  }, this);
}

Mesh.prototype.update = function(time, dt) {
  _.each(this.activeAnimations, function(activeAnimation) {
    activeAnimation.step(dt);
  });
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

        var bone = new Bone();
        if (boneData.parent != -1) {
          bone.parent = skeleton.bones[boneData.parent]
        }
        mat4.fromRotationTranslation(bone.transform, orientation, translation);
        
        skeleton.bones.push(bone)
      });
      self.skeletons.push(skeleton);
    });

    _.each(data.animations, function(animationData) {
      var animation = new Animation()
      animation.name = animationData.name
      _.each(animationData.frames, function(frameData) {
        var animationFrame = new AnimationFrame();
        animationFrame.time = frameData.time;
        _.each(frameData.armatures, function(armatureData) {
          var skeleton = new Skeleton();
          skeleton.name = armatureData.name;
          _.each(armatureData.bones, function(boneData) {
            var translation = vec3.fromValues(boneData.translation.x, boneData.translation.y, boneData.translation.z)
            var orientation = quat.fromValues(boneData.orientation.x, boneData.orientation.y, boneData.orientation.z, boneData.orientation.w);

            var bone = new Bone();
            if (boneData.parent != -1) {
              bone.parent = skeleton.bones[boneData.parent]
            }
            mat4.fromRotationTranslation(bone.transform, orientation, translation);
            skeleton.bones.push(bone)
          });
          animationFrame.skeletons.push(skeleton);
        });
        animation.frames.push(animationFrame)
      }, this);
      this.animations.push(animation)
    }, self);

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
