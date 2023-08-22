uniform vec2 uResolution;
uniform float uAspect;

uniform vec2 uMouse;
uniform float uMouseHover;
uniform bool uFlipMouseY;

uniform bool uMixIcon;
uniform sampler2D uIconMap;
uniform vec3 uIconMapColorBackground;
uniform vec3 uIconMapColorForeground;
uniform vec2 uIconMapResolution;

uniform bool uBackside;

uniform sampler2D uOverlayMap;

#pragma glslify: rgb2hsb = require(glsl-color)
#pragma glslify: roundRect = require(../../../../../shaders/roundRect.glsl)

vec4 mixIcon(vec4 color, vec2 uv) {
  vec2 iconSize = uIconMapResolution / uResolution;

  vec2 iconUv = uv / iconSize;
  // Offset icon to bottom right
  iconUv.x -= (uResolution.x - uIconMapResolution.x) / uIconMapResolution.x;

  vec4 iconMap = texture2D(uIconMap, iconUv);
  vec3 iconColor = mix(uIconMapColorBackground, uIconMapColorForeground, 1.0 - iconMap.r);

  float edgeH = min(step(0.0, 1.0 - iconUv.x), step(0.0, iconUv.x));
  float edgeV = min(step(0.0, 1.0 - iconUv.y), step(0.0, iconUv.y));
  float edge = min(edgeH, edgeV);

  return vec4(mix(color.rgb, iconColor, edge), color.a);

}

vec4 mixOverlayMap(vec4 color, vec2 uv) {
  vec4 overlayColor = texture2D(uOverlayMap, uv);
  return mix(color, overlayColor, overlayColor.r * 0.7);
}

vec4 getDiffuseColor(vec2 uv) {
  vec2 offsetUv = uv;

  if(uBackside == true) {
    offsetUv.x = 1.0 - offsetUv.x;
  }

  vec4 color = texture2D(map, offsetUv);

  if(uBackside == true) {
    vec4 edgeColor = texture2D(map, vec2(0.0));
    color = mix(edgeColor, vec4(color.rrr, 1.0), color.g * 0.125);
  }

  return mixOverlayMap(color, uv);
}

vec4 blurDiffuseColor(vec2 uv, float radiusPx, float quality, float directions) {
  float radius = radiusPx / uResolution.x;
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
  float blobRadius = 24.0 / uResolution.x * uMouseHover;
  vec2 aUv = vec2(vMapUv.x, vMapUv.y / uAspect);
  vec2 m0 = vec2(uMouse.x, uFlipMouseY ? 1.0 - uMouse.y : uMouse.y);
  vec2 m1 = vec2(m0.x, m0.y / uAspect);
  float blob = distance(aUv, m1);
  float blobEdge = 1.0 - step(blobRadius, blob);
  if(blobEdge > 0.0) {
    color = blurDiffuseColor(vMapUv, 8.0, 16.0, 16.0);
    float l = rgb2hsb(color.rgb).z;
    color.rgb -= blobEdge * (l - 0.5) * 0.1;
  }

  return color;
}
