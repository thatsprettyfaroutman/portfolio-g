
// TODO: remove unused files

// precision highp float;
// precision highp sampler2D;

#define PI 3.1415926538;

#include <fog_pars_fragment>
uniform vec2 uResolution;
uniform sampler2D uMap;
uniform sampler2D uOverlayMap;
uniform vec2 uMouse;
uniform float uMouseHover;
varying vec2 vUv;
varying vec3 vNormal;

vec4 blur(sampler2D map, vec2 uv) {

  float PI2 = 6.28318530718;

    // Config
  float DIRECTIONS = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
  float QUALITY = 6.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
  float SIZE = 16.0; // BLUR SIZE (Radius)

    // Computed
  vec2 r = SIZE / uResolution.xy;
  vec4 color = texture(map, uv);
  float dStep = PI2 / DIRECTIONS;
  float qStep = 1.0 / QUALITY;

    // Blur calculations
  for(float d = 0.0; d < PI2; d += dStep) {
    for(float i = qStep; i <= 1.0; i += qStep) {
      color += texture2D(map, uv + vec2(cos(d), sin(d)) * r * i);
    }
  }

  return color /= QUALITY * DIRECTIONS + ((DIRECTIONS / 2.0) - 1.0);
}

void main() {

  vec2 px = 1.0 / uResolution;
  vec2 padding = 24.0 * px;
  vec2 uvScale = padding * 2.0 + 1.0;
  vec2 scaledUv = vUv * uvScale - padding;
  vec4 color = texture2D(uMap, vUv);

  // Blur edges 
  // if(vUv.x < padding.x ||
  //   vUv.y < padding.y ||
  //   vUv.x > 1.0 - padding.x ||
  //   vUv.y > 1.0 - padding.y) {
  //   color = blur(uMap, scaledUv);
  // }

  // Blur bottom
  // if(vUv.y < padding.y * 4.0) {
  //   color = blur(uMap, vUv);
  // }

  // Smooth Blob
  // color.rgb += smoothstep(1.0 - blobRadius - 0.01, 1.0 - blobRadius, 1.0 - distance(aUv, m1)) * uMouseHover * 0.1;

  // vec2 overlayOffset = vec2(0.0, 1.0 - uMouseHover);
  // vec4 overlay = texture2D(uOverlayMap, vUv + overlayOffset);
  vec4 overlay = texture2D(uOverlayMap, vUv);

  // Apply overlay as shadow
  // color.rgb -= overlay.a * 0.1;

  // Mouse hover overlay blur
  // if(overlay.a * uMouseHover > 0.01) {
  //   color = blur(uMap, vUv);
  // }

  // Overlay (always) blur
  if(overlay.a > 0.01) {
    color = mix(color, blur(uMap, vUv), overlay.a);
  }

  // Apply overlay as is
  // color.rgb = mix(color.rgb, overlay.rgb, overlay.a * uMouseHover);

  // Mouse blob
  float aspect = uResolution.x / uResolution.y;
  float blobRadius = 16.0 * px.x;
  vec2 aUv = vec2(vUv.x, vUv.y / aspect);
  vec2 m0 = (vec2(uMouse.x, uMouse.y) + 1.0) * 0.5;
  vec2 m1 = vec2(m0.x, m0.y / aspect);
  float blobbiness = step(1.0 - blobRadius, 1.0 - distance(aUv, m1)) * uMouseHover;
  if(blobbiness > 0.1) {
    color = blur(uMap, vUv);
    color.rgb += blobbiness * 0.1;
  }

  // color.rgb += vNormal * 2.0 * overlay.rgb * overlay.a * uMouseHover;

  // Overlay as specular
  color.rgb += (abs(vNormal.y) + vNormal.z * 0.1) * overlay.rgb * overlay.a;

  // color.rgb -= clamp(0.0, 0.1, 1.0 - vUv.x);
  color.rgb += vNormal.y * 0.25;
  // color.rgb += vNormal.xyz * 0.1;
  gl_FragColor = color;

  #include <fog_fragment>
}
