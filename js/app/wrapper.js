function Wrapper() {
  app = null;
}

Wrapper.prototype.animate = function(time) {
  this.app.update(time)
  this.app.render()
  var self = this;
  requestAnimationFrame(function(time) {
    self.animate(time);
  });
}

Wrapper.prototype.run = function() {
  var canvas = document.getElementById("canvas");
  this.app = new App();
  this.app.init(canvas);
  this.animate(0);

  var scenePath = $("body").data("scene");
  this.app.loadScene(scenePath);
}
