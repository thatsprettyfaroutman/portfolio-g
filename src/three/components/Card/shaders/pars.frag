//

// TODO: clean up

uniform vec2 uResolution;
uniform float uAspect;

// TODO: remove uMapAspect
uniform float uMapAspect;

uniform vec2 uMapSize;
uniform vec2 uMapPosition;
uniform float uMapBorderRadius;

uniform vec2 uMouse;
uniform float uMouseHover;
uniform sampler2D uTitleMap;

// TODO: remove if unused
uniform sampler2D uHardLightMap;

uniform sampler2D uOverlayMap;
uniform vec3 uOverlayBackgroundColor;
uniform vec3 uOverlayTextColor;

#pragma glslify: blendHardLight = require(glsl-blend/hard-light)
#pragma glslify: blendOverlay = require(glsl-blend/darken)
#pragma glslify: rgb2hsb = require(glsl-color)
// #pragma glslify: hsb2rgb = require(glsl-color/hsb2rgb.glsl)
#pragma glslify: roundRect = require(../../../shaders/roundRect.glsl)

// TODO: uniform
bool flipY = false;

vec4 paper(vec4 color) {
  vec4 hardLightColor = texture2D(uHardLightMap, vRoughnessMapUv);
  return vec4(blendHardLight(color.rgb, hardLightColor.yyy, 1.0), color.a);
}

// TODO: remove if unused
// vec4 mixOverlay(vec4 color) {
//   vec4 color2 = texture2D(uOverlayMap, vMapUv);
//   return vec4(blendHardLight(color.rgb, color2.rgb, 0.1), color.a);
// }

// vec4 mixTitle(vec4 color) {
//   vec4 titleColor = texture2D(uTitleMap, vMapUv);
//   vec3 mixedColor = mix(color.rgb, titleColor.rgb, titleColor.a);
//   return vec4(mixedColor, color.a);
// }

vec4 mixOverlay(vec4 color, vec2 uv) {
  vec4 overlayMapColor = texture2D(uOverlayMap, uv);
  vec3 overlayColor = mix(uOverlayBackgroundColor, uOverlayTextColor, 1.0 - overlayMapColor.r);
  return vec4(mix(color.rgb, overlayColor, overlayMapColor.a), color.a);
}

vec4 getDiffuseColor(vec2 uv) {
  // Uses uniform `map`

  vec2 mapSize = uMapSize / uResolution;
  vec2 offsetUv = uv / mapSize;

  if(length(uMapPosition) > 0.0) {
    vec2 mapPosition = uMapPosition / uResolution;
    offsetUv -= mapPosition / mapSize;
  }
  // center x
  // offsetUv.x -= (((1.0 - mapSize.x) / (mapSize.x))) * 0.5;
  // center y
  // offsetUv.y -= (((1.0 - mapSize.y) / (mapSize.y))) * 0.5;

  vec4 color = texture2D(map, offsetUv);

  vec4 edgeColor = texture2D(map, vec2(0.0, 0.01));
  // Darken if bright and brighten if dark
  // edgeColor.rgb -= (rgb2hsb(edgeColor.rgb).z - 0.5) * 0.05;

  if(offsetUv.x < 0.0 || offsetUv.x > 1.0 || offsetUv.y < 0.0 || offsetUv.y > 1.0) {
    color = edgeColor;
  }

  if(uMapBorderRadius > 0.0) {
    vec2 boxCenter = offsetUv - 0.5;
    boxCenter.y /= uAspect;
    vec2 boxSize = vec2(0.5, 0.5 / uAspect);
    float cornerRadius = uMapBorderRadius / uResolution.x / mapSize.x;
    float cornerDistance = roundRect(boxCenter, boxSize, cornerRadius);
    float edge = step(0.0, cornerDistance);
    color = mix(color, edgeColor, edge);
  }

  // TODO: Uncomment if title graphics are used
  // color = mixTitle(color);

  // Attemt to make light colors rougher
  // vec4 roughnessColor = texture2D(roughnessMap, vRoughnessMapUv);
  // color.rgb = blendHardLight(color.rgb, roughnessColor.ggg);

  return color;
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
  vec2 m0 = vec2(uMouse.x, flipY ? 1.0 - uMouse.y : uMouse.y);
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