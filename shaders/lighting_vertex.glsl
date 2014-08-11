precision mediump float;

attribute vec4 position;
attribute vec3 normal;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

varying vec4 vNormal;
varying vec4 vPosition;

void main() {
  vNormal = vec4(normal, 1.0);
  vPosition = model * position;
  gl_Position = projection * view * model * position;
}
