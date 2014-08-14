precision mediump float;

const int MAX_POINT_LIGHTS = 1;

uniform mat4 normalMatrix;
uniform mat4 model;
uniform mat4 view;

uniform vec3 PointLightPosition[MAX_POINT_LIGHTS];
uniform vec3 PointLightColor[MAX_POINT_LIGHTS];

varying vec4 vPosition;
varying vec4 vNormal;

void main() {
  vec3 diffuse = vec3(0.0, 0.0, 0.0);

  for (int i = 0; i < MAX_POINT_LIGHTS; i++) {
    vec3 lightPosition = PointLightPosition[i];

    vec3 lightDir = lightPosition - vPosition.xyz;
    vec3 lightDirN = normalize(lightDir);

    mat4 modelView = view * model;

    vec4 vNormalV = normalMatrix * vNormal;
    vec3 vNormalVN = normalize(vNormalV.xyz);

    float dotProduct = dot(lightDirN, vNormalVN);
    vec3 lightColor = PointLightColor[i];

    diffuse += lightColor * dotProduct;
  }

  gl_FragColor = vec4(diffuse, 1.0);
}
