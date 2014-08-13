function Mesh() {
  this.material = new BlinnPhongMaterial();

  this.localToWorld = null;
  this.localToWorld = mat4.create();
  mat4.identity(this.localToWorld);
  mat4.translate(this.localToWorld, [0, 0, -10], this.localToWorld)

  this.submeshes = []
}

Mesh.prototype.render = function(renderer, lights, projection, view) {
  var self = this;
  _.each(this.submeshes, function(submesh) {
    submesh.render(renderer, lights, projection, view, self.localToWorld);
  });
}

Mesh.prototype.load = function(renderer, path, cb) {
  var self = this;
  $.get(path, function(data) {
    var submeshesData = data.submeshes;

    function loadNextSubMesh(submeshesData) {
      var submeshData = submeshesData.pop();
      var submesh = new SubMesh();
      submesh.init(renderer, submeshData.vertices, submeshData.normals, submeshData.indices, function() {
        self.submeshes.push(submesh);
        if (submeshesData.length) {
          loadNextSubMesh(submeshesData)
        }
        else {
          console.log("finished loading");
          cb();
        }
      });
    }

    loadNextSubMesh(submeshesData)
  });
}
