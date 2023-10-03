

// #define USE_UV;
// #define NORMAL;
#define TIME_SCALE 0.1;
#define TANGENT_FACTOR 0.001;

uniform float uTime;
uniform float uAspect;
uniform vec2 uMouse;
uniform float uMouseHover;

#pragma glslify: pnoise = require(glsl-noise/periodic/3d)
#pragma glslify: getOrthogonal = require(../../../../../shaders/getOrthogonal.glsl)

float noisify2(vec3 position) {
  float t = uTime * TIME_SCALE;
  float d = length(position.xy) * 0.25;
  float x = (position.x) * d * 20.0;
  float y = (position.y) * d * 20.0;
  float z = (position.z * 100.0 + t);
  return pnoise(vec3(x, y, z), vec3(3.0));
}

vec3 distort(vec3 position) {

  // Circular effect
  float alpha = (1.0 - smoothstep(0.0, 1.0, distance(vec2(position.x, position.y), uMouse))) * uMouseHover;

  // Poster effect
  // float alpha = smoothstep(0.0, 1.0, ((distance(vec2(position.x, position.y / uAspect), uMouse))) * uMouseHover);

  // float alpha = (1.0 - (distance(vec2(position.x, position.x / uAspect), uMouse.xx))) * uMouseHover;

  float theta = noisify2(position);
  theta *= alpha;

  // float thetaX = theta * alpha * distance(position.x, uMouse.x);
  // float thetaY = theta * alpha;

  // Original nudge
  // float nudgeAmount = 0.08 - cos(z) * sin(z + 2.0) * 0.08;
  float nudgeAmount = 0.0;

  // Add Wobbly
  nudgeAmount += 0.08 * theta;

  // float c = cos(thetaX);
  // float s = sin(thetaY);

  float c = cos(theta);
  float s = sin(theta);

  float scale = 2.0 / 3.0;

  float x = position.x + nudgeAmount * s;
  float y = (position.y / uAspect + nudgeAmount * c) * uAspect;
  float z = (position.z / uAspect + nudgeAmount * c * s * -1.0) * uAspect;

  return vec3(x, y, z);

  // vec3 distortedPosition = vec3(position.x + nudgeAmount * sx, position.y + nudgeAmount * cy, position.z + nudgeAmount * cx * sx * -1.0);

  // // return mix(position, distortedPosition, alpha);

  // // return vec3(distortedPosition.xy, z3);

  // // return mix(position, distortedPosition, uMouse.xyx);

  // return distortedPosition;
}

// vNormal = distortNormal(vNormal, transformed);

vec3 distortNormal(vec3 normal, vec3 position, vec3 distortedPosition) {
  vec3 tangent1 = getOrthogonal(normal);
  vec3 tangent2 = normalize(cross(normal, tangent1));
  vec3 nearby1 = position + tangent1 * TANGENT_FACTOR;
  vec3 nearby2 = position + tangent2 * TANGENT_FACTOR;
  vec3 distorted1 = distort(nearby1);
  vec3 distorted2 = distort(nearby2);
  return normalize(cross(distorted1 - distortedPosition, distorted2 - distortedPosition));
}

// Calculate normals
// vec3 tangent1 = getOrthogonal(transformedNormal);
// vec3 tangent2 = normalize(cross(transformedNormal, tangent1));
// vec3 nearby1 = position + tangent1 * TANGENT_FACTOR;
// vec3 nearby2 = position + tangent2 * TANGENT_FACTOR;
// vec3 distorted1 = distort(nearby1);
// vec3 distorted2 = distort(nearby2);
// vNormal = normalize(cross(distorted1 - distortedPosition, distorted2 - distortedPosition));

// gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);