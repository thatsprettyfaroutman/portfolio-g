uniform float uTime;
uniform vec2 uMouse;

#pragma glslify: pnoise = require(glsl-noise/periodic/3d)

float noisify(vec3 point, float z2, float d) {
  float x = (point.x + 0.31) * d; // + z2;
  float y = (point.y - 1.73) * d; // + z2;
  return pnoise(vec3(x, y, point.z), vec3(2.0));
}

vec3 distort(vec3 position) {
  float t = uTime * TIME_SCALE;
  float d = length(position.xy) * 0.25;
  float z = position.z + t;
  float z2 = position.z + t * 0.3;
  float theta = noisify(vec3(position.xy, z), z2, d) * PI * 4.0;

  // Original nudge
  // float nudgeAmount = 0.08 - cos(z) * sin(z + 2.0) * 0.08;
  float nudgeAmount = 0.0;

  // Add glitch
  // nudgeAmount += mix(-1.0, 1.0, pow(theta, -0.5)) * 0.0125;

  // Add Wobbly
  nudgeAmount += 0.08;

  // Add Aurora Borealis
  // nudgeAmount += exp(theta - 2.0 * PI);

  // Add Space mosquito
  // nudgeAmount += step(0.5, pow(theta, 10.0));

  // float nudgeAmount = mod(theta, 1.0);
  // float nudgeAmount2 = max(0.0, cos(z) * sin(z + 2.0)) * 0.16;

  float c = cos(theta);
  float s = sin(theta);
  vec3 distortedPosition = vec3(position.x + nudgeAmount * s, position.y + nudgeAmount * c, position.z + nudgeAmount * c * s

    // Spike ball
    // position.z + nudgeAmount * pow(c * s, -0.5) 
  );

  // float angleZ = PI * 0.5;
  // mat2 rotateMatrix = get2dRotateMatrix(angleZ);
  // distortedPosition.xy *= rotateMatrix;

  return distortedPosition;
}