// TODO: remove unused files

#define PI 3.1415926538;
#define TIME_SCALE 0.05;
#define TANGENT_FACTOR 0.1;
#define DISTORT_SCALE 2.0;

#include <fog_pars_vertex>

uniform float uTime;
uniform vec2 uDistortOffsetUv;
uniform vec2 uMouse;
uniform float uMouseHover;

varying vec2 vUv;
varying vec3 vNormal;

#pragma glslify: pnoise = require(glsl-noise/periodic/3d)
#pragma glslify: getOrthogonal = require(../../../shaders/getOrthogonal.glsl)
#pragma glslify: get2dRotateMatrix = require(../../../shaders/get2dRotateMatrix.glsl)

float noisify(vec3 point, float z2, float d) {
  float x = point.x * d + z2;
  float y = point.y * d + z2;
  return pnoise(vec3(x, y, point.z), vec3(0.0));
}

vec3 distort(vec3 p) {

  // float amount = distance(vec2(p.x, p.y), 0.5 * vec2(uMouse.x, uMouse.y));

  vec3 res = p;
  // res.z = amount * uMouseHover;

  // float theta = noisify(p, 1.0, 1.0);
  // float s = sin(theta);
  // float c = cos(theta);
  // res.x += s * 0.08;
  // res.y += c * 0.08;

  return res;
}

void main() {
  #include <begin_vertex>
  #include <project_vertex>
  #include <fog_vertex>
  vUv = uv;
  vNormal = normal;

  if(uMouseHover > 0.0) {
    vec3 distortedPosition = distort(position);

    // Distorted Normal
    vec3 tangent1 = getOrthogonal(normal);
    vec3 tangent2 = normalize(cross(normal, tangent1));
    vec3 nearby1 = position + tangent1 * TANGENT_FACTOR;
    vec3 nearby2 = position + tangent2 * TANGENT_FACTOR;
    vec3 distorted1 = distort(nearby1);
    vec3 distorted2 = distort(nearby2);
    vNormal = normalize(cross(distorted1 - distortedPosition, distorted2 - distortedPosition));

    // TODO: pass aspect ratio as uniform
    float angleY = uMouseHover * -uMouse.x * 0.2;
    float angleX = uMouseHover * -uMouse.y * 0.2 / (2.0 / 3.0);
    mat2 rotateMatrixXZ = get2dRotateMatrix(angleY);
    mat2 rotateMatrixYZ = get2dRotateMatrix(angleX);
    distortedPosition.xz *= rotateMatrixXZ;
    distortedPosition.yz *= rotateMatrixYZ;
    vNormal.yz *= rotateMatrixYZ;
    vNormal.xz *= rotateMatrixXZ;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
  }
}
