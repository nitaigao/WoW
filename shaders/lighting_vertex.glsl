precision mediump float;

const int MAX_BONE_WEIGHTS = 4;
const int MAX_BONES = 16;

attribute vec4 position;
attribute vec4 normal;

attribute vec4 boneindex;
attribute vec4 boneweight;

uniform mat4 bones[MAX_BONES];

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

varying vec4 vNormal;
varying vec4 vPosition;

void main() {
  vNormal = vec4(normal.xyz, 1.0);
  vPosition = model * position;

  vec4 skinnedPosition = 
    boneweight.w * bones[int(boneindex.w)] * position + 
    boneweight.z * bones[int(boneindex.z)] * position + 
    boneweight.y * bones[int(boneindex.y)] * position + 
    boneweight.x * bones[int(boneindex.x)] * position;

  gl_Position = projection * view * model * skinnedPosition;
}
