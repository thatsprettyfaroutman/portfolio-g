uniform vec2 uResolution;
uniform float uAspect;

uniform vec2 uMouse;
uniform float uMouseHover;
uniform bool uFlipMouseY;

#pragma glslify: rgb2hsb = require(glsl-color)
#pragma glslify: roundRect = require(../../../../../shaders/roundRect.glsl)

vec4 getDiffuseColor(vec2 uv) {
  vec4 color = texture2D(map, uv);
  return color;
}

vec4 blurDiffuseColor(vec2 uv, float radiusPx, float quality, float directions) {
  float radius = radiusPx / 400.0;
  float DOUBLE_PI = 6.28318530718;
  vec4 color = getDiffuseColor(uv);
  float dStep = DOUBLE_PI / directions;
  float qStep = 1.0 / quality;

  // Blur calculations
  for(float d = 0.0; d < DOUBLE_PI; d += dStep) {
    for(float i = qStep; i <= 1.0; i += qStep) {
      color += getDiffuseColor(uv + vec2(cos(d), sin(d)) * radius * i);
    }
  }

  return color /= quality * directions + ((directions / 2.0) - 1.0);
}

vec4 mixMouseBlob(vec4 color) {
  float blobRadius = 80.0 / 400.0 * uMouseHover;
  vec2 aUv = vec2(vMapUv.x, vMapUv.y / uAspect);
  // vec2 m0 = vec2(uMouse.x, uMouse.y);
  // vec2 m1 = vec2(m0.x, m0.y / uAspect);

  vec2 m = uMouse * 0.5 + 0.5;
  m.y /= uAspect;

  float blob = distance(aUv, m);
  float blobEdge = 1.0 - smoothstep(1.0 - blobRadius, blobRadius, blob);
  if(blobEdge > 0.0) {
    color = blurDiffuseColor(vMapUv, 8.0, 16.0, 16.0);
    float l = rgb2hsb(color.rgb).z;
    color.rgb -= blobEdge * (l - 0.5) * 0.1;
  }

  return color;
}
