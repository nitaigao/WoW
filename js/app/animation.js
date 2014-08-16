function AnimationFrame() {
  this.time = 0
  this.skeletons = []
};

function Animation() {
  this.name = ""
  this.timer = 0;
  this.frames = []
};

Animation.prototype.step = function(dt) {
  this.timer += dt;
}

Animation.prototype.frameSkeleton = function() {
  for (var i = 0; i < this.frames.length; i++) {
    var frame = this.frames[i];
    if (frame.time > this.timer) {
      return frame.skeletons[0];
    }
  }
  this.timer = 0;
  return this.frames[0].skeletons[0]
}