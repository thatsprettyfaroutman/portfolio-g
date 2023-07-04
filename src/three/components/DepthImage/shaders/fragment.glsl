#define NORMAL
#define USE_UV

#include <fog_pars_fragment>
#include <uv_pars_fragment>

uniform float uTime;
uniform sampler2D uMap;
uniform sampler2D uDepthMap;
uniform sampler2D uNormalMap;
uniform vec2 uMouse;
uniform float uAspect;
varying vec3 vNormal;
varying vec3 vPosition;

#pragma glslify: blendHardLight = require(glsl-blend/hard-light)

void main() {
  vec4 color = texture2D(uMap, vUv);

  // vec4 depth = texture2D(uDepthMap, vUv);

  // Normal map experiments with paperlike texture
  // vec2 normalMapUv = fract(vUv * vec2(10.0, 10.0 / uAspect));
  // vec4 normalMap = texture2D(uNormalMap, normalMapUv);
  // color.rgb = blendHardLight(color.rgb, normalMap.rrr);

  // Patterns
  // vec2 fUv = fract(vUv * vec2(10.0, 10.0 / uAspect));
  // vec4 fColor = texture2D(uMap, fUv);
  // float s = (sin(uTime + vUv.y) + 1.0) * 0.5;
  // float something = 1.0 - step(s, 1.0 - distance(fUv, vec2(0.5)));

  // Circless yaa
  // color = mix(vec4(color.rgb, step(0.5, 1.0 - (depth.r * 2.0 - 0.5))), color, something);

  // Little mes omg
  // color = mix(fColor, color, something);

  // Cant remember what these are
  // color.rgb += step(0.95, mod(vUv.x, 1.0 / 128.0) * 128.0);
  // color.rgb += step(0.95, mod(vUv.y, 1.0 / (128.0 / uAspect)) * (128.0 / uAspect));

  // color.rgb += vNormal.y * depth.r;

  // vec3 ringCenter = vec3(0.5, 0.5 / uAspect, 0.0);
  // vec2 ringPosition = vec2(vPosition.x, vPosition.y) - (vec2(uMouse.x, uMouse.y) - 1.0) * ringCenter.xy;
  // float alpha = 1.0 - distance(vec3(ringPosition, vPosition.z), ringCenter);

  // Ringlines
  // float numRings = 6.0;
  // float ringGap = 8.0 / 800.0;
  // float ringWidth = 2.0 / 800.0;
  // float minRing = 0.68;

  // Rings
  // for (float i = 0.0; i < numRings; i++) {
  //   if (alpha >= (minRing + ringGap * i) && alpha < (minRing + ringGap * i + ringWidth)) {
  //     color.rgb += vUv.xyx;
  //   }
  // }

  // Round cursor
  // minRing = 0.7;
  // if (alpha >= minRing) {
  //   color.rgb += vUv.xyx;
  // }

  // vec2 aspectUv = vec2(vUv.x, vUv.y / uAspect);
  // float colorMultiplier = -(alpha - 1.0);
  // float idk = colorMultiplier * 0.01;

  gl_FragColor = color;

}