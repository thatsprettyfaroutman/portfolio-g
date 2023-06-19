#define PI 3.1415926538
#define TIME_SCALE 0.05;
#define TANGENT_FACTOR 0.1;

uniform float uTime;
uniform float uPointSize;

varying vec3 vDistorted;
varying vec3 vNormal;
varying vec2 vUv;

#pragma glslify: pnoise = require(glsl-noise/periodic/3d)

// http://lolengine.net/blog/2013/09/21/picking-orthogonal-vector-combing-coconuts
vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
}

float noisify(vec3 point, float z2, float d) {
  float x = (point.x + 0.31) * d + z2;
  float y = (point.y - 1.73) * d + z2;
  return pnoise(vec3(x, y, point.z), vec3(0.0));
}

vec3 distort(vec3 point) {
  float t = uTime * TIME_SCALE;
  float d = length(point.xy) * 0.25;
  float z = point.z + t;
  float z2 = point.z + t * 0.3;
  float theta = noisify(vec3(point.xy, z), z2, d) * PI * 4.0;
  float nudgeAmount = 0.08 - cos(z) * sin(z + 2.0) * 0.08;
  float c = cos(theta);
  float s = sin(theta);
  vec3 pos = vec3(point.x + nudgeAmount * c, point.y + nudgeAmount * s, point.z + nudgeAmount * c * s);
  return pos;
}

void main() {
  vUv = uv;

  vec3 pos = position;
  vDistorted = distort(pos);

  // Calculate new normals
  vec3 tangent1 = orthogonal(normal);
  vec3 tangent2 = normalize(cross(normal, tangent1));
  vec3 nearby1 = pos + tangent1 * TANGENT_FACTOR;
  vec3 nearby2 = pos + tangent2 * TANGENT_FACTOR;
  vec3 distorted1 = distort(nearby1);
  vec3 distorted2 = distort(nearby2);
  vNormal = normalize(cross(distorted1 - vDistorted, distorted2 - vDistorted));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(vDistorted, 1.0);
  gl_PointSize = uPointSize;
}
