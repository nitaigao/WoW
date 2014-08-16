precision mediump float;

const int MAX_BONE_WEIGHTS = 4;
const int MAX_BONES = 12;

attribute vec4 position;
attribute vec4 normal;

attribute vec4 boneindex;
attribute vec4 boneweight;

uniform mat4 bones[MAX_BONES];
uniform mat4 bonesnormal[MAX_BONES];

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

uniform vec3 options;

varying vec4 vNormal;
varying vec4 vPosition;

void main() {

  bool useSkinning = bool(options.x);

  if (useSkinning) {
    vec4 skinnedPosition = 
      boneweight.w * bones[int(boneindex.w)] * position + 
      boneweight.z * bones[int(boneindex.z)] * position + 
      boneweight.y * bones[int(boneindex.y)] * position + 
      boneweight.x * bones[int(boneindex.x)] * position;

    vec4 skinnedNormal = 
      boneweight.w * bonesnormal[int(boneindex.w)] * normal + 
      boneweight.z * bonesnormal[int(boneindex.z)] * normal + 
      boneweight.y * bonesnormal[int(boneindex.y)] * normal + 
      boneweight.x * bonesnormal[int(boneindex.x)] * normal;

    vNormal = skinnedNormal;
    vPosition = model * skinnedPosition;
    gl_Position = projection * view * model * skinnedPosition;
  }

  else {
    vNormal = vec4(normal.xyz, 1.0);
    vPosition = model * position;
    gl_Position = projection * view * model * position;
  }
}
