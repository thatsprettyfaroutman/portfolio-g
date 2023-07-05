#define TIME_SCALE 0.05;
#define TANGENT_FACTOR 0.01;
#define DISTORT_SCALE 2.0;

#define USE_UV
#define NORMAL

#include <common>
#include <fog_pars_vertex>
#include <uv_pars_vertex>
#include <normal_pars_vertex>

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uMouseHover;
uniform sampler2D uDepthMap;
uniform float uAspect;
uniform vec2 uDepthBend;
uniform float uDepthMid;

// varying vec2 vUv;
// varying vec3 vNormal;
varying vec3 vPosition;

#pragma glslify: getOrthogonal = require(../../../shaders/getOrthogonal.glsl)
#pragma glslify: get2dRotateMatrix = require(../../../shaders/get2dRotateMatrix.glsl)

vec2 getUv(vec3 pos) {
  return vec2(pos.x + 0.5, pos.y + 0.5);
}

vec3 getDepth(vec3 pos) {
  vec2 uv = getUv(pos);
  vec4 depth = texture2D(uDepthMap, uv);
  // float depthAmount = depth.g + uDepthMid;
  // depthAmount = pow(abs(depthAmount), 10.0) * sign(depthAmount);
  // vec3 depthPos = vec3(pos.xy, depthAmount);
  // depthPos.xy += depthPos.xy * (depthAmount);
  // depthPos.y += depthAmount * uDepthBend.y;

  float depthAmount = pow(depth.r, 4.0);
  vec3 depthPos = vec3(pos.xy, depthAmount + uDepthMid);
  depthPos.xy += depthPos.xy * depthAmount * 0.1;
  depthPos.y += -sqrt(depthAmount) * uDepthBend.y;

  // float depthAmount = pow(abs(depth.r), 10.0) * sign(depth.r);
  // vec3 depthPos = vec3(pos.xy, -depthAmount);
  // depthPos.xy += depthPos.xy * depthAmount * 0.5;
  // depthPos.y += depthAmount * uDepthBend.y;

  return depthPos;
}

void main() {  
  #include <begin_vertex>
  #include <uv_vertex>
  #include <beginnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>

  transformed = getDepth(transformed);

  // Tilting
  // float angleY = -uMouse.x * 0.1 * uAspect;
  // float angleX = -uMouse.y * 0.1;
  // mat2 rotateMatrixXZ = get2dRotateMatrix(angleY);
  // mat2 rotateMatrixYZ = get2dRotateMatrix(angleX);
  // transformed.xz *= rotateMatrixXZ;
  // transformed.yz *= rotateMatrixYZ;

  #include <project_vertex>
  #include <fog_vertex>

  vPosition = transformed;
  // vNormal = normal;

  vec3 tangent1 = getOrthogonal(normal);
  vec3 tangent2 = normalize(cross(normal, tangent1));
  vec3 nearby1 = transformed + tangent1 * TANGENT_FACTOR;
  vec3 nearby2 = transformed + tangent2 * TANGENT_FACTOR;
  vec3 depth1 = getDepth(nearby1);
  vec3 depth2 = getDepth(nearby2);
  vNormal = normalize(cross(depth1 - transformed, depth2 - transformed));

  // Tilt normals
  // vNormal.xz *= rotateMatrixXZ;
  // vNormal.yz *= rotateMatrixYZ;

  // gl_PointSize = 10.0;
  gl_Position = projectionMatrix * mvPosition;
}