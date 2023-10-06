

#define TIME_SCALE 0.1;
#define TANGENT_FACTOR 0.001;

uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseHover;

#pragma glslify: pnoise = require(glsl-noise/periodic/3d)
#pragma glslify: getOrthogonal = require(../../../../../shaders/getOrthogonal.glsl)

float noisify2(vec3 position) {
  float t = uTime * TIME_SCALE;
  // float d = position.x * 0.25; 
  // d += position.y * 0.125;
  float d = length(position.xy) * 0.25;
  float x = (position.x) * d * 20.0;
  float y = (position.y) * d * 20.0;
  float z = (position.z * 100.0 + t);
  return pnoise(vec3(x, y, z), vec3(3.0));
}

vec3 distort(vec3 position) {

  // Circular effect
  float alpha = (1.0 - smoothstep(0.0, 1.0, distance(position.xy, uMouse * 0.5))) * uMouseHover;

  float theta = 1.0;

  theta *= noisify2(position - vec3(uMouse.xy * 0.05, 0.0));
  theta *= alpha;

  float nudgeAmount = 0.08 * theta;

  float c = cos(theta);
  float s = sin(theta);

  float scale = 2.0 / 3.0;

  // float x = position.x;
  // float y = position.y;
  float x = position.x + nudgeAmount * s;
  float y = (position.y / scale + nudgeAmount * c) * scale;
  float z = (position.z / scale + nudgeAmount * c * s * -1.0) * scale;

  return vec3(x, y, z);

}

vec3 distortNormal(vec3 normal, vec3 position, vec3 distortedPosition) {
  vec3 tangent1 = getOrthogonal(normal);
  vec3 tangent2 = normalize(cross(normal, tangent1));
  vec3 nearby1 = position + tangent1 * TANGENT_FACTOR;
  vec3 nearby2 = position + tangent2 * TANGENT_FACTOR;
  vec3 distorted1 = distort(nearby1);
  vec3 distorted2 = distort(nearby2);
  return normalize(cross(distorted1 - distortedPosition, distorted2 - distortedPosition));
}
