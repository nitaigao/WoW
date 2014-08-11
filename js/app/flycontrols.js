function FlyControls(camera) {
  this.camera = camera;
  this.position = vec3.create();

  this.lastMouseX = -9999;

  var self = this;
  $("body").keyup(function(event) {
    if (event.keyCode == 87) {
      self.moveForward = false;
    }

    if (event.keyCode == 83) {
      self.moveBackward = false;
    }

    if (event.keyCode == 65) {
      self.strafeLeft = false;
      // self.rotateLeft = false;
    }

    if (event.keyCode == 68) {
      self.strafeRight = false;
      // self.rotateRight = false;
    }
  });

  $("body").keydown(function(event) {
    if (event.keyCode == 87) {
      self.moveForward = true;
    }

    if (event.keyCode == 83) {
      self.moveBackward = true;
    }

    if (event.keyCode == 65) {
      self.strafeLeft = true;
      // self.rotateLeft = true;
    }

    if (event.keyCode == 68) {
      self.strafeRight = true;
      // self.rotateRight = true;
    }
  });

  var self = this;
  $("body").mousemove(function(event) {
    var mouseX = event.pageX;

    if (self.lastMouseX === -9999) {
        self.lastMouseX = mouseX;
        return;
    }


    var deltaX = mouseX - self.lastMouseX;
    self.lastMouseX = mouseX;

    var angle = deltaX * -0.01;
    self.rotationY += angle;

    self.camera.rotate(deltaX * -0.01, [0, 1, 0]);
  });
}

FlyControls.prototype.update = function(dt) {
  if (this.moveForward) {
    var forward = [0, 0, -1 * dt * 10];
    this.camera.translate(forward);
  }

  if (this.moveBackward) {
    var backward = [0, 0, 1 * dt * 10];
    this.camera.translate(backward);
  }

  if (this.strafeLeft) {
    var left = [-1 * dt * 20, 0, 0];
    this.camera.translate(left);
  }

  if (this.strafeRight) {
    var right = [1 * dt * 20, 0, 0 ];
    this.camera.translate(right);
  }

  if (this.rotateLeft) {
    this.camera.rotate(1.0 * dt * 2, [0, 1, 0]);
  }

  if (this.rotateRight) {
    this.camera.rotate(-1.0 * dt * 2, [0, 1, 0]);
  }
}
